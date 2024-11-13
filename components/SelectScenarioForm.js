import React from 'react';

const SelectScenarioForm = ({ShowScenarios, selectScenario, scenariosList}) => {
    return (
    <div className='container w-full h-full  absolute z-20 top-1/2 left-1/2
        -translate-x-[50%] -translate-y-[50%] gradient-style overflow-auto no-scrollbar'>
        <div className='relative flex items-center justify-center w-full h-full m-0 animate-fadeInScale '>
          <div className='absolute p-2 text-xl text-white border-white rounded-md cursor-pointer top-5 right-4 border-1 '
           onClick={()=>ShowScenarios()}
          >X</div>
          <ul className='flex flex-col items-center justify-center w-full h-full space-y-2'>
            {scenariosList.map((s, index)=>{
              return <li 
                key = {index}
                className='w-[80%] bg-slate-600 text-center p-3 text-lg rounded-md cursor-pointer text-slate-50 border-1 border-bg-gray-50 hover:bg-gray-400 hover:text-gray-800'
                onClick={(e)=>selectScenario(s)}
                >{s}</li>  
            })}
          </ul>           
        </div>
    </div>
);
}

export default SelectScenarioForm;
