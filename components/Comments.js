import React from 'react';
import {DownloadIcon} from '@heroicons/react/outline'

const Comments = ({scenario_name, date, custsWithoutConditions}) => {
    return (
        <div className='container flex items-center justify-between w-full p-2 px-3 '>
            <div className='flex items-center p-2 px-3 space-x-20'>
                <p className='text-lg font-semibold text-red-600 cursor-pointer hover:text-blue-600 '>* Invalid Data : ( )</p>
                <p className='text-lg font-semibold text-gray-800'>* Selected Scenario : 
                    (<span> {scenario_name}</span><span> {date}</span>)
                </p>
                <p className='text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600 '>* Customers Without Scenario : ({custsWithoutConditions.length})</p>
            </div>
            <div className='px-3'>
                <DownloadIcon className='text-gray-800 cursor-pointer w-7 h-7 hover:animate-bounce'/> 
            </div>
        </div>
    );
}

export default Comments;
