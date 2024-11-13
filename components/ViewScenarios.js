import React from 'react';

const ViewScenarios = ({AllScenarios, hideScenariosPage}) => {

    const scenariosList  = [...new Set( AllScenarios.map(s =>{ // get unique list of scenarios
        return s.scenario_name + "|" + s.date
        })
      )]
    
    console.log(AllScenarios);
    const styleOne = `pt-5 pb-4 group-hover:text-gray-600 text-gray-600 font-semibold text-md`

    
    return (
        <div className='container w-full h-full  absolute z-20 top-1/2 left-1/2 pb-[50px]
        -translate-x-[50%] -translate-y-[50%] bg-gradient-to-tr from-violet-700 via-sky-200 to-violet-500 overflow-auto no-scrollbar'>
            <div className='relative flex justify-between max-w-full max-h-full m-0 animate-fadeInScale '>
                <div className='absolute p-2 text-xl text-white border-white rounded-md cursor-pointer top-5 right-4 border-1 '
                onClick={()=>hideScenariosPage()}
                >X</div>

                <div className='p-2 mt-20 w-[25%] max-h-full verflow-auto no-scrollbar'>
                   <ul className='p-0 m-0'>
                    {scenariosList.map((s, index)=>{
                        return <li key={index}
                            className='flex flex-wrap p-3 py-3 overflow-x-hidden text-xl font-bold rounded-md cursor-pointer text-violet-600 hover:bg-blue-500 hover:text-white' 
                            >- {s}</li>
                    })}
                   </ul>
                </div>
                <div className='flex flex-1 h-full p-2 mt-20 border-l border-gray-500 verflow-auto no-scrollbar'>
                    <table className="table ">
                        <thead>
                            <tr className='font-serif text-sm bg-gray-600'>
                                <th scope="col" className='text-center align-middle '>
                                    <span className='text-gray-200'>Scenario Name</span>
                                </th>
                                <th scope="col" className='text-center align-middle '>
                                    <span className='text-gray-200'>Scenario Date</span>
                                </th>
                                <th scope="col" className='text-center align-middle '>
                                    <span className='text-gray-200'>Customer Id</span>
                                </th>
                                <th scope="col" className='text-center align-middle '>
                                    <span className='text-gray-200'>Customer Name</span>
                                </th>
                                <th scope="col" className='text-center align-middle '>
                                    <span className='text-gray-200'>Condition No</span>
                                </th>
                                <th scope="col" className='text-center align-middle '>
                                    <span className='text-gray-200'>Condition Desc.</span>
                                </th>
                                <th scope="col" className='text-center align-middle '>
                                    <span className='text-gray-200'>Model Desc.</span>
                                </th>
                                <th scope="col" className='text-center align-middle '>
                                    <span className='text-gray-200'>Condition Type</span>
                                </th>
                                <th scope="col" className='text-center align-middle '>
                                    <span className='text-gray-200'>Target/Limit</span>
                                </th>
                                <th scope="col" className='text-center align-middle '>
                                    <span className='text-gray-200'>Target Val.</span>
                                </th>
                                <th scope="col" className='text-center align-middle '>
                                    <span className='text-gray-200'>If True</span>
                                </th>
                                <th scope="col" className='text-center align-middle '>
                                    <span className='text-gray-200'>If False</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {AllScenarios.map((d, index)=>{
                                return (
                                    <tr key = {index} 
                                        className='cursor-pointer hover:bg-gray-300 group hover:font-bold text-md'
                                        >
                                        <td scope="row " className='py-3 text-center'>
                                            <span className = {` ${styleOne}`}>{d.scenario_name}</span>
                                        </td>
                                        <td scope="row " className='py-3 text-center'>
                                            <span className = {` ${styleOne}`}>{d.date}</span>
                                        </td>
                                        <td scope="row " className='py-3 text-center'>
                                            <span className = {` ${styleOne}`}>{d.Cust_id}</span>
                                        </td>
                                        <td  className='py-3 text-center'>
                                            <span className = {`${styleOne}`}>{d.Customer}</span>
                                        </td>
                                        <td  className='py-3 text-center'>
                                            <span className = {`${styleOne}`}>{d.Condition_no}</span> 
                                        </td>
                                        <td  className='py-3 text-center'>
                                            <span className = {`${styleOne}`}>{d.Condition_Desc}</span> 
                                        </td>
                                        <td  className='py-3 text-center'>
                                            <span className = {`${styleOne}`}>{d.Model_Desc}</span>
                                        </td>
                                        <td  className='py-3 text-center'>
                                            <span className = {`${styleOne}`}>{d.Condition_Type}</span> 
                                        </td>
                                        <td  className='py-3 text-center'>
                                            <span className = {`${styleOne}`}>{d['Target|Limit']}</span> 
                                        </td>
                                        <td  className='py-3 text-center'>
                                            <span className = {`${styleOne}`}>{d.Target_val}</span> 
                                        </td>
                                        <td  className='py-3 text-center'>
                                            <span className = {`${styleOne}`}>{d.If_True}</span> 
                                        </td>
                                        <td  className='py-3 text-center'>
                                            <span className = {`${styleOne}`}>{d.If_False}</span> 
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    );
}

export default ViewScenarios;
