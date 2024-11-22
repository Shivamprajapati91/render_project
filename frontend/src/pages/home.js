import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"}/>
       <VerticalCardProduct category={"televisions"} heading={"Best televisions"}/>
      <HorizontalCardProduct category={"camera"} heading={"Camera & photography"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Popular earphones"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Best selling phones"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerators"}/>
      <VerticalCardProduct category={"trimers"} heading={"Mouse"}/>
      <HorizontalCardProduct category={"mouse"} heading={"Popular earphones"}/>
      <HorizontalCardProduct category={"speakers"} heading={"Speakers"}/>
      <HorizontalCardProduct category={"processor"} heading={"New processors"}/>
      <VerticalCardProduct category={"printers"} heading={"Printers"}/>
      <VerticalCardProduct category={"watches"} heading={"Smart watches"}/>

      
    </div>
  )
}

export default home
