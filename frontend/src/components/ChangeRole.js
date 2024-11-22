import React, { useState } from 'react'
import ROLE from '../common/role' 
import {IoMdClose} from "react-icons/io"
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const ChangeRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole,setUserRole]=useState(role)
  
    const handleOnChangeSelect=(e)=>{
        setUserRole(e.target.value)
    }
    const updateUserRole = async()=>{
       const fetchResponse = await fetch(SummaryApi.updateUser.url,{
        method: SummaryApi.updateUser.method,
        credentials: 'include',
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({
            userId: userId,
            role: userRole
        })
    
       })
       const responseData = await fetchResponse.json()
       if(responseData.success){
        toast.success(responseData.message)
        onClose()
        callFunc()
       }
       console.log("updated",responseData)


    }
  return (
    <div className='fixed top-0 bottom-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
       <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
        <button className='block ml-auto' onClick={onClose}>
            <IoMdClose/>
        </button>
       <h className='text-lg font-medium pb-4'>Change User Role</h>
        <p >Name:  {name}</p>
        <p>Email: {email}</p>
        <div className='flex justify-between items-center my-4'>
        <p>Role:</p>
        <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
            {
                Object.values(ROLE).map(el=>{
                    return(
                        <option value={el} key={el}>{el}</option>
                    )
                })
            }
            
        </select>
        </div>
        <button className='w-fit mx-auto block rounded-full bg-red-500 text-white hover:bg-red-700 py-1 px-3 ' onClick={updateUserRole}>Change Role</button>
       </div>
    </div>
  )
}

export default ChangeRole
