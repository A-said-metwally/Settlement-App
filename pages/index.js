import React, { useEffect, useState, useRef  } from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import * as XLSX from 'xlsx'

import { db } from '../firebase/init-firebase'
import {collection, addDoc ,getDocs, query, where, updateDoc, doc, onSnapshot} from 'firebase/firestore'
import Loading from '../components/Loading'
import { useRouter } from 'next/router'

import scenariosDf from '../masterData/scenarios.json'
// import salesDf from '../masterData/sales.json'

import Controles from '../components/Controles'
import ResultTable from '../components/ResultTable'
import SelectScenarioForm from '../components/SelectScenarioForm'
import Comments from '../components/Comments'
import DisplayScenario from '../components/DisplayScenario'
import IntroSection from '../components/IntroSection'
import ViewSales from '../components/ViewSales'
import ViewScenarios from '../components/ViewScenarios'


function Index() {


  // after loading page :-
  // 1- intro section

  const [ProcessState, setProcessState] = useState(0) 

  // 2- fetching scenarios from backend
  // 3- store scenarios in them state
  const [AllScenarios, setAllScenarios] = useState([])
  useEffect(()=>{ setAllScenarios(scenariosDf) },[])
  const scenariosList  = [...new Set( AllScenarios.map(s =>{ // get unique list of scenarios
    return s.scenario_name + "|" + s.date
    })
  )]
  
  // 3- upload sales data from excel and save it in them state
  const [UploadedSalesData, setUploadedSalesData] = useState([]) // sales data was uploaded

  const handleUpload = ($e)=>{
    const file = $e.target.files[0]
    const reader = new FileReader()
    
    reader.onload = (e)=>{
        const wb = XLSX.read(e.target.result)
        const sheets = wb.SheetNames
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]) // store data in rows
        setUploadedSalesData([...rows])
    }
    reader.readAsArrayBuffer(file)
    }

  // 4- sales data veification function


  // 5- select scenario
  const [ShowScenarios, setShowScenarios] = useState(false)
  const displayScenarios = ()=> setShowScenarios(true)
  const [MyScenario, setMyScenario] = useState([])

  const selectScenario = (e)=>{  // to display slect scenario form
    const scenario_name = e.split("|")[0]
    const date = e.split("|")[1]
    const selectedScenario = AllScenarios.filter((s)=>s.date === date & s.scenario_name === scenario_name)

      // Step 1: Create a map to count occurrences => check if the customer have desicion tree (=1) or sliced target (>1)
      const countMap = selectedScenario.reduce((acc, obj) => {
        const key = `${obj.Cust_id}-${obj.Model_Desc}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      // Add type of settlement (desicion = 1, sliced target > 1)
      const updatedScenario = selectedScenario.map(obj => {
        const key = `${obj.Cust_id}-${obj.Model_Desc}`;
        return { ...obj, type: countMap[key] === 1 ? "decisionTree" : "slicedTarget" };
      });

      setMyScenario(updatedScenario)
      setProcessState(6)
      setShowScenarios(false)
  }


  // 6- run calculation fun

  // create new var array called "condition_verification" = []
  let decissionTreeResult = []
  let slicedTargetResult = []
  let custsWithoutConditions = []

  // get unique customer list from actual sales table 
  const salesCustomers = [...new Set(UploadedSalesData.map(c => c.Cust_id))];

  // get unique customer list from settlement table
  const customersHaveConditions = [...new Set(MyScenario?.map(c => c.Cust_id))];

    // fn to append condition verficaton to condition Verification array result
    const addDecissionTreeCondResult = (C, actual_sales, achievement, result, state)=>{
      decissionTreeResult = [...decissionTreeResult, 
        {
          "Cust_id":C.Cust_id,
          "Customer":C.Customer,
          "Condition_Desc":C.Condition_Desc,
          "Model_Desc":C.Model_Desc,
          "Condition_Type":C.Condition_Type,
          "Target_val":C.Target_val,
          "actual_sales":actual_sales,
          "achievement":achievement,
          "result":result,
          "state":state,
          "class":'decisionTree'
        }
      ]
    }

    const addSlicedTargetCondResult = (C, actual_sales, achievement, result, state)=>{
      slicedTargetResult = [...slicedTargetResult, 
        {
          "Cust_id":C.Cust_id,
          "Customer":C.Customer,
          "Condition_Desc":C.Condition_Desc,
          "Model_Desc":C.Model_Desc,
          "Condition_Type":C.Condition_Type,
          "Target_val":C.Target_val,
          "actual_sales":actual_sales,
          "achievement":achievement,
          "result":result,
          "state":state,
          "class":'slicedTarget'
        }
      ]
    }


  // execlude customers with out conditions
  const excludeCustWithoutCond = ()=>{
      salesCustomers.forEach(custId =>{
      const customerExistchk = customersHaveConditions.indexOf(custId)
      if(customerExistchk < 0){ 
        custsWithoutConditions = [...custsWithoutConditions, {custId}]
      }
    })
  }
  excludeCustWithoutCond()


  
  // start loop at customer sales list------
  salesCustomers.forEach(custId =>{

      // get current customer scenario, sales, sliced sales, total sales, grouped slaes 
      let customerScenario  = MyScenario?.filter(s => s.Cust_id === custId && s.type === 'decisionTree')
      const customerSales  = UploadedSalesData.filter(s => s.Cust_id === custId )
      const totalSales = customerSales.reduce((sum, s) => sum + s.sales_qty, 0); // get total of sales qty
      const totalAmount = customerSales.reduce((sum, s) => sum + s.sales_amount, 0);  // get total of sales amount
      const groupedSales = customerSales.reduce((acc, curr) => { // sales by group
        acc[curr.item_group] = (acc[curr.item_group] || 0) + curr.sales_qty;
        return acc;
      }, {});

      // start loop at current customer scenario condition ---------
      customerScenario?.map((cs)=>{
        const modelDiscription = cs.Model_Desc
        const salesPrcnt = totalSales / cs.Target_val // calc % of target acheivement
        const amountPrcnt = totalAmount / cs.Target_val // calc % of target acheivement
        
        if(modelDiscription === "total_sales"){          // if model description = total_sales
          salesPrcnt >= 1
          ? addDecissionTreeCondResult(cs, totalSales, salesPrcnt, cs.If_True, true)  
          : addDecissionTreeCondResult(cs, totalSales, salesPrcnt, cs.If_False, false) 

        }else if(modelDiscription === "total_amount"){  // if model description = total_amount
          amountPrcnt >= 1
          ? addDecissionTreeCondResult(cs, totalSales, amountPrcnt, cs.If_True, true)  
          : addDecissionTreeCondResult(cs, totalSales, amountPrcnt, cs.If_False, false) 

        }else{                                         // if model description != total (by sales group)
          const currentSalesGroup = groupedSales[modelDiscription]
          const currentSalesGroupPrcnt = currentSalesGroup / totalSales
          currentSalesGroupPrcnt >= cs.Target_val
          ? addDecissionTreeCondResult(cs, currentSalesGroup, currentSalesGroupPrcnt, cs.If_True, true)  
          : addDecissionTreeCondResult(cs, currentSalesGroup, currentSalesGroupPrcnt, cs.If_False, false) 
        }
      }) // end customer scenario looping -----------


      // start looping at slicedTarget scenario ******************************
       customerScenario  = MyScenario.filter(s => s.Cust_id === custId && s.type === 'slicedTarget')
      // start loop at current customer scenario condition ---------
      customerScenario.map((cs)=>{
        const modelDiscription = cs.Model_Desc
        const salesPrcnt = totalSales / cs.Target_val // calc % of target acheivement
        const amountPrcnt = totalAmount / cs.Target_val // calc % of target acheivement
                  
          if(modelDiscription === "total_sales"){
            totalSales >= cs.Target_val
            ? addSlicedTargetCondResult(cs, totalSales, salesPrcnt, cs.If_True, true)
            : addSlicedTargetCondResult(cs, totalSales, salesPrcnt, cs.If_False, false)
          
          }else if(modelDiscription === "total_amount"){
            totalAmount >= cs.Target_val
            ? addSlicedTargetCondResult(cs, totalAmount, amountPrcnt, cs.If_True, true)
            : addSlicedTargetCondResult(cs, totalAmount, amountPrcnt, cs.If_False, false)

          }else{
            const currentSalesGroup = groupedSales[modelDiscription]
            const currentSalesGroupPrcnt = currentSalesGroup / totalSales
            currentSalesGroupPrcnt >= cs.Target_val
            ? addSlicedTargetCondResult(cs, currentSalesGroup, currentSalesGroupPrcnt, cs.If_True, true)  
            : addSlicedTargetCondResult(cs, currentSalesGroup, currentSalesGroupPrcnt, cs.If_False, false) 
  
          }        
      }) // end looping at slicedTarget scenario  ******************************
      
        // end loop at current customer scenario condition ---------
  })   // end loop at customer sales list ------


    
      // get maximum result in sliced target and push it to fianl result
      const maxResult = slicedTargetResult.reduce((acc, curr) => {
        const existing = acc.find(c => c.Cust_id === curr.Cust_id);
        if (existing) {
          existing.result = Math.max(existing.result, curr.result);
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
      
      // get final result for decission tree array by aggregated results values
      const accumulatedResult = {}
      // Loop through each item to accumulate qty
      decissionTreeResult.forEach(r => {
        if (accumulatedResult[r.Cust_id]) {
          accumulatedResult[r.Cust_id].accumulatedResult += r.accumulatedResult;  // Add accumulatedResult for existing Cust_id
        } else {
          accumulatedResult[r.Cust_id] = { Cust_id: r.Cust_id, Customer: r.Customer, result: r.result, class:"decisionTree" };  // Initialize new id
        }
      });

      // Convert the result object back to an array
      const finalResult = Object.values(accumulatedResult);

      const allResults = [...finalResult, ...maxResult]


  // upload new scenario vrification fn
  /*
        Cust_id => not null
        Customer => not null
        Condition_no => not null && unique
        Model_Desc => not null && if it contain total must have one of this array[total_sales, total_amount]
        Condition_Type => not null and one of [#, %]
        Target|Limit not active
        Target_val => not null
        If_True => not null
        If_False => not null
  */

  useEffect(()=>{
    let len  = UploadedSalesData.length
    if(len > 0){setProcessState(5)}
  },[UploadedSalesData])


  // const verifyUplodedData = ()=>{
  //   // if(ProcessState === 1)
  //   // ?
  //   // :
  // }

 
// fun to compine fian results with descissions and display selected customer scenario flow cahrt
const [DisplayCustomerScenarios, setDisplayCustomerScenarios] = useState(false)
const [CurrentScenario, setCurrentScenario] = useState()

const displayScenario = (e)=>{
    const customerScenario = MyScenario.filter((s)=>{return s.Cust_id === e})
    const scenarioType = customerScenario[0].type 
    const scenarioResult = ()=>{
      if(scenarioType === "decisionTree"){
        return decissionTreeResult.filter((r)=>{return r.Cust_id === e})
      }else{
        return slicedTargetResult.filter((r)=>{return r.Cust_id === e})
      }
    } 

    let combinedData =  [];
    scenarioResult().map((s)=>{
      const currentCondition = customerScenario.filter(cs =>{return cs.Model_Desc === s.Model_Desc & cs.Target_val === s.Target_val })
      combinedData = [...combinedData , {...s, If_True : currentCondition[0].If_True, If_False : currentCondition[0].If_False}]
    })
    setCurrentScenario(combinedData)
    setDisplayCustomerScenarios(true)
}

const [ShowSales, setShowSales] = useState(false)
const showSalesData = ()=>setShowSales(true)


const [ShowScenariosPage, setShowScenariosPage] = useState(false)
const showScenariosPage = ()=>setShowScenariosPage(true)

  const [ComponentsLoading, setComponentsLoading] = useState(1)
  useEffect(()=>{
    setTimeout(() => {
      setComponentsLoading(2)
    }, 25000);
  },[])

  return (
    <div id='main_page' className='relative min-w-full min-h-full m-0 gradient-style'>
    <Header title={''}/>
          {ComponentsLoading === 1 && <IntroSection />}
          
          {ComponentsLoading >= 2 && <NavBar showSalesData = {showSalesData} showScenariosPage = {showScenariosPage}/>}
        
          {ComponentsLoading >= 2 && <Controles
           handleUpload = {handleUpload} 
           ProcessState = {ProcessState} 
           displayScenarios = {displayScenarios}/>}

          { ComponentsLoading >= 2 && ShowScenarios && 
            <SelectScenarioForm 
            ShowScenarios = {()=>{setShowScenarios(false)}} 
            selectScenario = {selectScenario} 
            scenariosList = {scenariosList}
            />
          }

          {ComponentsLoading >= 2 && MyScenario.length > 0 && 
            <Comments 
            scenario_name = {MyScenario[0].scenario_name} 
            date = {MyScenario[0].date}
            custsWithoutConditions = {custsWithoutConditions}
          />}
          
          {ComponentsLoading >= 2 && MyScenario.length > 0 && <ResultTable allResults = {allResults} displayScenario = {displayScenario}/>}

          {ComponentsLoading >= 2 && DisplayCustomerScenarios &&  <DisplayScenario 
            CurrentScenario = {CurrentScenario} 
            hideScenario = {()=>setDisplayCustomerScenarios(false)}/>}

          {ShowSales && <ViewSales UploadedSalesData = {UploadedSalesData} hideSales = {()=>{setShowSales(false)}}/>}

          {ShowScenariosPage && <ViewScenarios AllScenarios = {AllScenarios} hideScenariosPage = {()=>setShowScenariosPage(false)}/>}


    </div>
  )
}

export default Index