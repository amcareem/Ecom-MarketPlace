import React from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../components/context'
import axios from 'axios';
import { useEffect } from 'react';
import Productcard from '../components/Productcard';

const ShopProductPage = () => {
  const {shopId} = useParams();
  const { productList,setProductList} = useGlobalContext();
  // const shopId = params.shopId;
  // console.log("parameter",params);
  useEffect(() =>{
    getAllProducts();
  },[])

  const getAllProducts = async() => {
    return await axios
      .get(`http://localhost:3002/api/getProduct/${shopId}`)
      .then((response) => {
        setProductList(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
    
  }
  
  return (
    <>
      <div className='font-Inter mt-10 flex px-4 gap-8'>
        <div className='w-3/12 bg-cardColor h-screen'>
          <h1 className='text-center'>Product Category</h1>
        </div>
        <div className='w-7/12'> {
        productList.length >=1 ? productList.map((currProduct) =>{
          return <Productcard 
            productName = {currProduct.productName} 
            productDescription= {currProduct.productDescription} 
            productImagePath = {currProduct.productImagePath}
            productPrice = {currProduct.productPrice}
            productId = {currProduct.productId}
            shopId = {shopId}
          />
        }): <div className='noResult'>No result found...</div>
      }</div>
      <div className='w-2/12 bg-cardColor h-screen'>
          <h1 className='text-center'>Advertisement</h1>
      </div>
      </div>
      
    </>
  )
}

export default ShopProductPage
