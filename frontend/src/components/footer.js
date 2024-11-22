import React from 'react'
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const footer = () => {
  return (
    <footer className='bg-slate-200'>
      <div className='container mx-auto p-4 '>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='font-bold text-lg hover:cursor-pointer'>Shivam's Shop</h1>
            <p>@shivam's shop</p>
          </div>
          <div className='flex items-center justify-center  gap-4'>
              <FaFacebook className='hover:text-2xl text-xl hover:cursor-pointer'/>
              <FaLinkedin className='hover:text-2xl text-xl hover:cursor-pointer'/>
              <FaSquareInstagram className='hover:text-2xl text-xl hover:cursor-pointer'/>
          </div>
          <div  className='flex items-center justify-center gap-2'>
            <p className='text-lg font-semibold hover:cursor-pointer'>Terms</p>
            <p className='text-lg font-semibold hover:cursor-pointer'>Policy</p>
          </div>
      </div>
    </footer>
  )
}

export default footer
