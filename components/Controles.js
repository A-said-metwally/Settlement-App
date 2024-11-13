import React, { useState } from 'react';
import {ArrowRightIcon, CheckIcon} from '@heroicons/react/outline'


const Controles = ({handleUpload, ProcessState, displayScenarios}) => {
    
    // fn to execute file selector
    const executeSelect = ()=>{
        const input = document.getElementById('file-select')
        input.click()
    }

    

    return (
        <div className='container flex items-center justify-center mt-[50px] '>
                <div className='flex flex-col items-center justify-center'>
                    <div className='h-[150px] w-[150px] p-2 rounded-full border border-gray-600 flex items-center justify-center text-2xl 
                    text-gray-100 bg-blue-500 shadow-md shadow-orange-200 text-center font-serif hover:cursor-pointer hover:scale-105 hover:bg-sky-500'
                    onClick={()=>executeSelect()}
                    >Upload Sales Data</div>
                    <input 
                        type="file" 
                        className='hidden' 
                        id='file-select'
                        onChange={handleUpload}
                    />
                    {ProcessState >= 1 && <CheckIcon className='w-12 h-12 text-green-500 animate-fadeInScale'/>}
                </div>
            { ProcessState >= 2 && <ArrowRightIcon className='-mt-[40px] h-[50px] w-[50px] text-blue-800 animate-fadeInScale'/>}

            { ProcessState >= 3 && 
                <div className='flex flex-col items-center justify-center'>
                    <div className='h-[150px] w-[150px] p-2 rounded-full border border-gray-600 flex items-center justify-center text-2xl 
                    text-gray-100 bg-blue-500 shadow-md shadow-orange-200 text-center font-serif hover:cursor-pointer hover:scale-105 hover:bg-sky-500'
                    >Verification</div>
                    <CheckIcon className='w-12 h-12 text-green-500 animate-fadeInScale '/>
                </div>
            }

            { ProcessState >= 4 && <ArrowRightIcon className='-mt-[40px] h-[50px] w-[50px] text-blue-800 animate-fadeInScale'/>}
            { ProcessState >= 5 && 
                <div className='flex flex-col items-center justify-center'>
                    <div className='h-[150px] w-[150px] p-2 rounded-full border border-gray-600 flex items-center justify-center text-2xl 
                    text-gray-100 bg-blue-500 shadow-md shadow-orange-200 text-center font-serif hover:cursor-pointer hover:scale-105 hover:bg-sky-500'
                    onClick={()=>displayScenarios()}
                    >Select Calc. Scenario</div>
                    <CheckIcon className='w-12 h-12 text-green-500 animate-fadeInScale'/>
                </div>
            }



        </div>
    );
}

export default Controles;
