import React from 'react';

const ViewSales = ({UploadedSalesData, showSales}) => {

    const styleOne = `pt-5 pb-4 group-hover:text-gray-600 text-gray-600 font-semibold text-xl`

    console.log(UploadedSalesData);
    
    return (
        <div className='container w-full h-full  absolute z-20 top-1/2 left-1/2 pb-[50px]
        -translate-x-[50%] -translate-y-[50%] bg-gradient-to-tr from-violet-700 via-sky-200 to-violet-500 overflow-auto no-scrollbar'>
            <div className='relative flex justify-center w-full h-full m-0 animate-fadeInScale '>
                <div className='absolute p-2 text-xl text-white border-white rounded-md cursor-pointer top-5 right-4 border-1 '
                onClick={()=>showSales()}
                >X</div>

                <table className="table mt-[100px]">
                    <thead>
                        <tr className='font-serif bg-gray-600 '>
                            <th scope="col" className='text-center align-middle '>
                                <span className='text-gray-200'>Customer Id</span>
                            </th>
                            <th scope="col" className='text-center align-middle '>
                                <span className='text-gray-200'>Customer Name</span>
                            </th>
                            <th scope="col" className='text-center align-middle '>
                                <span className='text-gray-200'>Item Group</span>
                            </th>
                            <th scope="col" className='text-center align-middle '>
                                <span className='text-gray-200'>Item Name</span>
                            </th>
                            <th scope="col" className='text-center align-middle '>
                                <span className='text-gray-200'>Sales Qty</span>
                            </th>
                            <th scope="col" className='text-center align-middle '>
                                <span className='text-gray-200'>Sales Amount</span>
                            </th>
                            <th scope="col" className='text-center align-middle '>
                                <span className='text-gray-200'>Returns</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {UploadedSalesData.map((d, index)=>{
                            return (
                                <tr key = {index} 
                                    className='cursor-pointer hover:bg-gray-300 group hover:font-bold text-md'
                                    // onClick={()=>displayScenario(d.Cust_id)}
                                    >
                                    <td scope="row " className='py-3 text-center'>
                                        <span className = {` ${styleOne}`}>{d.Cust_id}</span>
                                    </td>
                                    <td  className='py-3 text-center'>
                                        <span className = {`${styleOne}`}>{d.Customer}</span>
                                    </td>
                                    <td  className='py-3 text-center'>
                                        <span className = {`${styleOne}`}>{d.item_group}</span> 
                                    </td>
                                    <td  className='py-3 text-center'>
                                        <span className = {`${styleOne}`}>{d.item}</span>
                                    </td>
                                    <td  className='py-3 text-center'>
                                        <span className = {`${styleOne}`}>{d.sales_qty}</span> 
                                    </td>
                                    <td  className='py-3 text-center'>
                                        <span className = {`${styleOne}`}>{d.sales_amount}</span> 
                                    </td>
                                    <td  className='py-3 text-center'>
                                        <span className = {`${styleOne}`}>{d.returns}</span> 
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ViewSales;
