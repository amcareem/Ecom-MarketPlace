import React from 'react'
import { useState } from 'react';
const ProductCard = (props) => {
  const[productAmount,setProductAmount] = useState(0);
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
        </div>
        

      </div>
    </>
  )
}

export default ProductCard
