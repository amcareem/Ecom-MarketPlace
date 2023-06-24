import React from 'react'
import { useGlobalContext } from '../components/context'
import { useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const UserCart = () => {
  const{userInfo,cartProducts,setCartProducts} = useGlobalContext();

  useEffect(()=>{
    getCartProducts();
  },[])

  const getCartProducts = async() => {
    return await axios
      .get(`http://localhost:5000/api//getCartDetails/${userInfo.userId}`)
      .then((response) => {
        setCartProducts(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
    
  }
  return (
    <>
    {
      cartProducts.length >=1 ? cartProducts.filter((currProduct,idx) => idx < 10).map((currProduct) =>{
          return <h1>{currProduct.productName}</h1>
        }): <div className='noResult'>No items in the cart...</div>
    }
    </>
  )
}

export default UserCart
