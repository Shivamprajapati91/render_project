import React,{useContext, useState} from 'react'
import loginIcon from '../assest/signin.gif'
import {Link, useNavigate} from 'react-router-dom'
import SummaryApi from '../common'
import {toast} from 'react-toastify'
import Context from '../context'



const Login = () => {
   const [data,setData]= useState({
    email: "",
    password: ""
   })

  const navigate = useNavigate()
  
  const {fetchUserDetails, fetchUserAddToCart} = useContext(Context)
  
   const handleOnChange =(e) =>{
     const {name,value} = e.target;

     setData((preve)=>{
        return{
            ...preve,
            [name] : value
        }
         
     })
   }
   const handleSubmit =async (e) =>{
    e.preventDefault()
    const dataResponse = await fetch(SummaryApi.signin.url,{
      method: SummaryApi.signin.method,
      credentials: 'include',
      headers:{
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const dataApi = await dataResponse.json()

    if(dataApi.success){
       toast.success(dataApi.message)
      
       navigate("/")
       fetchUserDetails()
       fetchUserAddToCart()
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
   }
   console.log("data login",data)
  return (
    <section id='login'>
      <div className='mx-auto container pt-5'>
        <div className='bg-white p-4 w-full max-w-sm mx-auto rounded'>
          
           <div className='w-20 h-20 mx-auto'>
              <img src={loginIcon} alt='login icon'/>
           </div>
          
          
           <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
             <div>
                <label>Email:</label>
                <div className='bg-slate-100 p-2'>
                 <input type='email' 
                 placeholder='enter email'
                 name='email'
                 value={data.email}
                 onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'/>
                </div>
             </div>

             <div>
                <label>Password:</label>
                <div className='bg-slate-100 p-2 flex '>
                 <input type='password'
                  placeholder='enter password'
                  name='password'
                  value={data.password} 
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'/>
                 
                </div>
                <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                  Forgot-password
                </Link>
             </div>

             <button className='bg-red-600 hover:bg-red-700 text-white -x-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-5'>Login</button>
           </form>
          <p className='my-5'>Don't have an account ?<Link to={'/signup'} className=' text-red-600 hover:underline hover:text-red-700'>Sign up</Link></p>
         
        </div>

      
      </div>
    </section>
  )
}

export default Login
