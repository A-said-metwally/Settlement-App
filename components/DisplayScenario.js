import React from 'react';
import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/outline'

const DisplayScenario = ({CurrentScenario, hideScenario}) => {
    const dtr = CurrentScenario
    // console.table(dtr);

    return (
        <div className='container w-full h-full  absolute z-20 top-1/2 left-1/2
        -translate-x-[50%] -translate-y-[50%] gradient-style overflow-auto no-scrollbar'>
            <div className='relative w-full h-full '>
                <div className='absolute p-2 text-xl text-white border-white rounded-md cursor-pointer top-5 right-4 border-1 '
                onClick={()=>hideScenario()}
                >X</div>

                <div className='flex flex-col items-center w-full h-full text-white'>
                    <p className='w-2/3 p-2 mt-4 text-3xl text-center bg-gray-400 border-white rounded-md border-1'>
                        {dtr[0].Customer} <span className='text-yellow-200'>( {dtr[0].class} )</span>
                    </p>
                    <div className='mt-6 text-md'>
                        {dtr.map((d, index)=>{
                            return <div key = {index} className='flex items-center mb-10 '>
                                        <div className='flex items-center p-3 '>
                                            <p className={`w-[80px] text-center p-4 border-white rounded-md border-1 bg-gray-400 ${d.state === false ? 'bg-red-600' : 'null'}`}>{d.If_False}</p>
                                            <ArrowLeftIcon className='w-6 h-6 text-2xl text-black'/>
                                            <span className='text-2xl font-bold text-orange-600'>F</span>
                                        </div>
                                        <div className={`p-3 w-[250px]  rounded-md border-1 border-white ${d.state === true ? 'bg-green-600' : 'bg-red-600'}`}>
                                            <p><span>{index + 1}- </span>Condition : {d.Model_Desc}</p>
                                            <p>- Type : {d.Condition_Type}</p>
                                            <p>- Traget : {d.Target_val}</p>
                                            <p>- Actual Sales : {d.actual_sales}</p>
                                            <p>- Achievement : {d.achievement.toFixed(4) * 100} %</p>
                                            <p>- Score : {d.result}</p>
                                            <p>- State : {d.state === true ? 'Success' : 'Failed' }</p>
                                        </div>
                                        <div className='flex items-center p-3'>
                                            <span className='text-2xl font-bold text-green-600'>T</span>
                                            <ArrowRightIcon className='w-6 h-6 text-2xl text-black'/>
                                            <p className={`w-[80px] text-center p-4 border-white rounded-md border-1 bg-gray-400 ${d.state === true ? 'bg-green-600' : 'null'}`}>{d.If_True}</p>
                                        </div>
                                    </div>
                        })}
                    </div>   
                </div>
            </div>
        </div>
    );
}

export default DisplayScenario;
