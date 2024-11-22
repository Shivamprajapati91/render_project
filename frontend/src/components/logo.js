import React from 'react'
import { FaShopify } from "react-icons/fa6";

const logo = ({w,h}) => {
  return (
   <div className='flex justify-center items-center'>
    <FaShopify className='text-red-600 text-2xl'/>
    <h1 className='text-lg font-bold'>Shivam's shop</h1>
   </div>
  )
}

export default logo
