import React from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../components/context'
import axios from 'axios';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';

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
      <div className='shop-product-page'>
      {
        productList.length >=1 ? productList.filter((currProduct,idx) => idx < 10).map((currProduct) =>{
          return <ProductCard 
            productId = {currProduct.productId}
            productName = {currProduct.productName} 
            productDescription= {currProduct.productDescription} 
            productImagePath = {currProduct.productImagePath}
            productPrice = {currProduct.productPrice}
          />
        }): <div className='noResult'>No result found...</div>
      }
      </div>
      
    </>
  )
}

export default ShopProductPage
