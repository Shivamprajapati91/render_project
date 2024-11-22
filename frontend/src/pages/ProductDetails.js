import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import SummaryApi from '../common'
import {FaStar} from "react-icons/fa"
import { FaStarHalf } from 'react-icons/fa'
import displayINRCurrency from '../helpers/displayCurrency'
import VerticalCardProduct from '../components/VerticalCardProduct'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const ProductDetails = () => {
  const [data,setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  })
  const params = useParams()
  const [loading,setLoading] = useState(false)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")
  const navigate = useNavigate()
  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })

 const [zoomImage,setZoomImage] = useState(false)
 const {fetchUserAddToCart} = useContext(Context)
  const fetchProductDetails= async()=>{
    setLoading(true)
     const response = await fetch(SummaryApi.productDetails.url,{
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
     })
     setLoading(false)
     const dataResponse = await response.json()

     setData(dataResponse?.data)
     setActiveImage(dataResponse?.data.productImage[0])
  }

  console.log("data",data)

  useEffect(()=>{
         fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageUrl)=>{
    setActiveImage(imageUrl)
  }
  const handleZoomImage= useCallback((e)=>{
    setZoomImage(true)
       const {left,top,width,height} = e.target.getBoundingClientRect()
       console.log("coordinate",left,top,width,height)

       const x= (e.clientX - left) / width
       const y= (e.clientY - top) / height
        setZoomImageCoordinate({
          x,
          y
        })
       
  },[zoomImageCoordinate])

  const handleZoomOutImage=()=>{
    setZoomImage(false)
  }

const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
}

const handleBuyProduct = async(e,id)=>{
  await addToCart(e,id)
  fetchUserAddToCart()
  navigate("/cart")
}

  return (
    <div className='container mx-auto p-4'>
       

       <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>
             
             <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                   <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleZoomOutImage}/>
                  
                  {
                    zoomImage && (
                      <div className=' hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] p-1 bg-slate-200 -right-[510px] top-0'>
                      <div className='w-full h-full mix-blend-multiply scale-150 min-h-[400px] min-w-[400px]'
                       style={{
                         backgroundImage:`url(${activeImage})`,
                         backgroundRepeat:'no-repeat',
                         backgroundPosition: `${zoomImageCoordinate.x *100}% ${zoomImageCoordinate.y *100}%`
                         }}>

                      </div>
                      </div>
                    )
                  }
                   
                </div>
                 
                 <div className='h-full'>
                    {
                      loading ? (
                        <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                          {
                            productImageListLoading.map((el,index)=>{
                              return(
                                <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                                    
                                </div>
                              )
                            })
                          }
                        </div>
                        
                      ) :(
                        <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                          {
                            data.productImage?.map((imgUrl,index)=>{
                              return(
                                <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgUrl}>
                                    <img src={imgUrl} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgUrl)} onClick={()=>handleMouseEnterProduct(imgUrl)}/>
                                </div>
                              )
                            })
                          }
                        </div>
                      )
                    }
                 </div>
             </div>
            {
              loading ? (
                <div className='grid gap-1 w-full'>
                <p className='bg-slate-200 animate-pulse h-6 w-full  rounded-full px-2 inline-block'></p>
                <h2 className='capitalize text-2xl lg:text-4xl font-medium bg-slate-200 animate-pulse h-6 w-full '></h2>
                <p className='text-slate-400 capitalize bg-slate-200 animate-pulse h-4 w-full '></p>

                <div className='text-red-600 bg-slate-200 animate-pulse h-4 w-full  flex items-center gap-1'>
                
                </div>

                <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl'>
                  <p className='text-red-600 bg-slate-200 animate-pulse h-4 w-full '></p>
                  <p className='text-slate-400 line-through bg-slate-200 animate-pulse h-4 w-full '></p>
                </div>
              <div className=' flex items-center gap-3 my-2'>
                  <button className='bg-slate-200 animate-pulse h-4 w-full '></button>
                  <button className='bg-slate-200 animate-pulse h-4 w-full '></button>
              </div>

              <div>
                <p className=' font-medium my-1 bg-slate-200 animate-pulse h-4 w-full '> </p>
                <p className='bg-slate-200 animate-pulse h-4 w-full '></p>
              </div>
                </div>
              ) : (
                <div className='flex flex-col gap-1'>
                <p className='capitalize bg-red-200 text-red-600 rounded-full px-2 inline-block w-fit'>{data?.brandName}</p>
                <h2 className='capitalize text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='text-slate-400 capitalize'>{data?.category}</p>

                <div className='text-red-600 flex items-center gap-1'>
                  <FaStar/>
                  <FaStar/>
                  <FaStar/>
                  <FaStar/>
                  <FaStarHalf/>
                </div>

                <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl'>
                  <p className='text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
                  <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
                </div>
              <div className=' flex items-center gap-3 my-2'>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[100px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy now</button>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[100px] text-white font-medium bg-red-600 hover:bg-white hover:text-red-600' onClick={(e)=>handleAddToCart(e,data._id)}>Add to cart</button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1'>Description :</p>
                <p>{data?.description}</p>
              </div>
             </div>
              )
            }
       </div>
       {
        data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended products"}/>
        )
       }
      
    </div>
  )
}

export default ProductDetails
