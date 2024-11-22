import React from 'react'
import successImage from '../assest/success.gif'
import { Link }from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-3 rounded'>
      <img src={successImage} width={150} height={150}  className='mix-blend-multiply'/>
      <p className='text-green-600 font-bold text-xl'>Payment Successfull</p>
      <Link to={"/order"} className='p-2 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>My orders</Link>
    </div>
  )
}

export default Success
