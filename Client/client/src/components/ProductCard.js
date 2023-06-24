import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useGlobalContext } from './context';
const ProductCard = (props) => {
  const[productAmount,setProductAmount] = useState(0);
  const{userInfo} = useGlobalContext();
  const product = {
    productId : props.productId,
    uuid : userInfo.userId,
    productName: props.productName,
    productPrice: props.productPrice,
    productAmount: productAmount
  }
  const addToCart = async() =>{
    return await axios
      .post('http://localhost:5000/api/addToCart',product)
      .then(res => console.log(res.data))
      .catch(err =>console.log(err))

  }
  
  const incAmount = () =>{
    (productAmount < 9) ? setProductAmount(productAmount+1) : setProductAmount(productAmount);
  }
  const decAmount = () =>{
    (productAmount > 0) ? setProductAmount(productAmount-1) : setProductAmount(productAmount);
  }
  return (
    <>
      <div className='product-card'>
        <div><img className='product-image' src={`http://localhost:3002/${props.productImagePath}`}/></div>
        <div className='section-2'>
          <div className='product-name'>{props.productName}</div>
          <div className='product-description'>{props.productDescription}</div>
        </div>
        <div className='section-3'>
          <div className='product-price'>₹{props.productPrice}</div>
          <div className='add-amount'>
            <button className='amount-button' onClick={decAmount}>-</button>
            <div className='product-amount'>{productAmount}</div>
            <button className='amount-button' onClick={incAmount}>+</button>
          </div>
          <div><button className='cart-button' onClick={addToCart}>Add to cart</button></div>
        </div>
        

      </div>
    </>
  )
}

export default ProductCard
