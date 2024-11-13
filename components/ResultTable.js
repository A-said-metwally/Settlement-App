import React from 'react';
import {ShoppingCartIcon} from '@heroicons/react/outline'


const ResultTable = ({allResults, displayScenario}) => {
    const styleOne = `pt-5 pb-4 group-hover:text-gray-600 text-gray-600 font-semibold text-xl`

    return (
        <div className='container w-full animate-fadeInScale'>
            <table className="table">
                <thead>
                    <tr className='font-serif bg-gray-600 '>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-200'>Customer Id</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-200'>Customer Name</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-200'>Result</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-200'>Class</span>
                        </th>
                        <th scope="col" className='text-center align-middle '>
                            <span className='text-gray-200'>Show Sales</span>
                        </th>
                    </tr>
                </thead>
                <tbody className=''>
                    {allResults.map((d, index)=>{
                        return (
                            <tr key = {index} 
                                className='cursor-pointer hover:bg-gray-300 group hover:font-bold text-md'
                                onClick={()=>displayScenario(d.Cust_id)}
                                >
                                <td scope="row " className='py-3 text-center'>
                                    <span className = {` ${styleOne}`}>{d.Cust_id}</span>
                                </td>
                                <td  className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>{d.Customer}</span>
                                </td>
                                <td  className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>{d.result * 100}%</span>
                                </td>
                                <td  className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>{d.class}</span> 
                                </td>
                                <td  className='py-3 text-center'>
                                    <span className = {`${styleOne}`}>
                                        <ShoppingCartIcon className='w-6 h-6 m-auto cursor-pointer hover:scale-110 hover:text-blue-500'/>
                                    </span> 
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable;
