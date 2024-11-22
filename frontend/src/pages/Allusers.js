import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import {MdModeEdit} from 'react-icons/md'
import ChangeRole from '../components/ChangeRole'

const Allusers = () => {
    const [allUser,setAllUsers]=useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
      email:"",
      name:"",
      role:"",
      _id:""
    })
    const fetchAllUsres= async()=>{
      const fetchData = await fetch(SummaryApi.allUser.url,{
        method: SummaryApi.allUser.method,
        credentials: 'include'
      })
      const dataResponse = await fetchData.json()

      if(dataResponse.success){
        setAllUsers(dataResponse.data)
      }
      if(dataResponse.error){
        toast.error(dataResponse.message)
      }

      console.log(dataResponse)
      
    }
    useEffect(()=>{
      fetchAllUsres()
    },[])


  return (
    <div className='bg-white pb-4'>
      <table className='w-full usertable'>
        <thead>
          <tr className='bg-black text-white'>
          <th>Sr.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created at</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
           allUser.map((el,index)=>{
            return(
              <tr>
                <td>{index+1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format('LL')}</td>
                <td>
                  <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                  onClick={()=>{
                    setUpdateUserDetails(el)
                    setOpenUpdateRole(true)

                  }}>
                    <MdModeEdit/>
                  </button>
                </td>
              </tr>
            )
           })
          }
        </tbody>
      </table>
      {
       openUpdateRole && (
         <ChangeRole onClose={()=>setOpenUpdateRole(false)} 
         name={updateUserDetails.name}
         email={updateUserDetails.email}
         role={updateUserDetails.role}
         userId={updateUserDetails._id}
         callFunc={fetchAllUsres}
         />
       )
      }
      
    </div>
  )
}

export default Allusers
