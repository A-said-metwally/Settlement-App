import Link from 'next/link'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import {UserIcon, KeyIcon} from '@heroicons/react/outline'

function NavBar({showSalesData, showScenariosPage}) {
    const [UserInfo, setUsersInfo] = useState()
    let decryptedData = secureLocalStorage.getItem('sessionInfo') // get encrypted user data 

    const [NavOptions, setNavOptions] = useState([])

    const getNavOptions = ()=>{
        let opt = []
        UserInfo?.data.pages.map((p)=>{
            const pgIndex = opt.indexOf(p.type)
            if(pgIndex === -1){opt.push(p.type)}
            return setNavOptions(opt)
        })
    }

    const dropdownList = (opt)=>{
        const list = UserInfo?.data.pages.filter((p)=>{return p.type === opt})
        return list
    }

    useEffect(()=>{setUsersInfo(decryptedData)},[]) // get user info from decrypted data

    useEffect(()=>{getNavOptions()},[UserInfo])


    return (
    <div className='container flex flex-col items-center h-10 p-2 shadow-md sm:flex-row sm:items-center sm:justify-center sm:space-x-10 bg-stone-200 animate-fadeInScale'>
       
       <Link href='/' className=''>
            <a className='font-serif text-lg font-bold text-orange-600 cursor-pointer hover:no-underline hover:text-orange-600'>Main</a>
        </Link>
        <Link href='/' className=''>
            <a onClick={(e)=>{e.preventDefault, showScenariosPage()}} className='font-serif text-lg font-bold no-underline cursor-pointer text-violet-700 hover:text-gray-700'>Scenarios</a>
        </Link>
        <Link href='/' className=''>
            <a onClick={(e)=>{e.preventDefault, showSalesData()}} className='font-serif text-lg font-bold no-underline cursor-pointer text-violet-700 hover:text-gray-700'>Sales Data</a>
        </Link>




    </div>
    )
}

export default NavBar