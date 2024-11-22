import React,{useContext, useState} from 'react'
import Logo from './logo'
import {Link, useLocation, useNavigate} from 'react-router-dom'

import { FaRegCircleUser } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import {toast} from 'react-toastify'
import {setUserDetails} from '../store/userSlice'
import ROLE from '../common/role';
import Context from '../context'
const Header = () => {
   const user = useSelector(state => state?.user?.user)
   const dispatch = useDispatch()
   const [menuDisplay,setMenuDisplay] = useState(false)
   const context = useContext(Context)
   const navigate = useNavigate()
   const searchInput = useLocation()
   const URLSearch = new URLSearchParams(searchInput?.search)
   const searchQuery = URLSearch.getAll("q")

   const [search,setSearch] = useState(searchQuery)
   
   

   const handleLogout = async()=>{
      const fetchData = await fetch(SummaryApi.logout_user.url,{
         method: SummaryApi.logout_user.method,
         credentials: 'include'
      })
      const data = await fetchData.json()
      if(data.success){
         toast.success(data.message)
         dispatch(setUserDetails(null))
         navigate("/")
      }
      if(data.error){
         toast.error(data.error)
      }
   }
   
 const handleSearch = (e)=>{
   const {value} = e.target
   setSearch(value)
   if(value){
      navigate(`/search?q=${value}`)
   }else{
      navigate("/search")
   }
 }

  return (
   <header className='h-16 shadow-md bg-white fixed w-full z-40'>
    
    <div className='h-full container mx-auto flex items-center px-4 justify-between'>
       <div className=''>
          <Link to={"/"}>
          <Logo w={90} h={50}/>
          </Link>
       </div>
       <div className=' flex item-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
        <input type='text' placeholder='search product here..' className='w-full outline-none ' onChange={handleSearch} value={search}/>
        <div className='text-lg h-8 min-w-[50px] bg-red-600 flex items-center justify-center rounded-r-full'>
           <GrSearch/>
        </div>
       </div>
       <div className='flex items-center gap-7'>
        <div className='relative  flex justify-center'>
         {
            user?._id && (
               <div className='text-2xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
               {
                  user?.profilePic ?(
                     <img src={user?.profilePic} className="w-10 h-10 rounded-full" alt={user?.name} />
                  ): (
                     <FaRegCircleUser/>
                  ) 
               }
               </div>
            )
         }
        
         {
            menuDisplay && (
               <div className='absolute bg-white top-11 h-fit p-2 shadow-lg rounded '>
               <nav>
                {
                  user?.role === ROLE.ADMIN && (
                     <Link to={"/admin-panel/all-products"} className='whitespace-nowrap  md-hidden hover:bg-slate-200 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin pannel</Link>
                  )
                }
                <Link  to={"/order"} className='whitespace-nowrap  md-hidden hover:bg-slate-200 p-2' onClick={() => setMenuDisplay(preve => !preve)}>My order</Link>
               </nav>
              </div>
            )
         }
        
        
        </div>
        {
            user?._id && (
              <Link to={"/cart"} className='2xl relative cursor-pointer'>
              <span> <FaShoppingCart/></span>
         
               <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
               <p className='text-xs'>{context.cartProductCount}</p>
              </div>
          
        
            </Link>
           )
         }
        <div>{
           user?._id ? (
            <button onClick={handleLogout} className='px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700'>Log out</button>
           ):(
            <Link to={"/login"} className='px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700'>Login</Link>
           )
         }
        
        </div>
       </div>
    </div>
   </header>
  )
}

export default Header
