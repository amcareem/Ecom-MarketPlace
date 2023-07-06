import axios from 'axios';
import React from 'react'
import { useGlobalContext } from '../../components/context';
import { useState } from 'react';

const Addresscard = (props) => {
    const {userName,addressLine1,state,country,city,postalCode,mobileNumber,addressId,isDefault} = props;
    const{defaultAddress,setDefaultAddress} = useGlobalContext();
    const handleDefault = async() =>{
      return await axios
      .put(`http://localhost:9000/setDefaultAddress/${addressId}`,{
        isDefault : true
      })
      .then((res)=>{
        console.log(res);
        setDefaultAddress(addressId);
      })
      .catch((err)=>{
        console.log(err);
      })

    }
  return (
    <>
      <button onClick={()=>handleDefault()} className={`capitalize rounded-lg my-5 w-full h-20  bg-cardColor text-xl font-semibold flex flex-col px-5 justify-center ${(addressId === defaultAddress) ?'border-2 border-buttonColor shadow-md': ''}`}>
        <div className='flex gap-1'>
          <div className=''>{userName},</div>
          <div className='font-medium text-lg'>{addressLine1},</div>
          <div className='font-medium text-lg'>{postalCode}</div>
        </div>
        <div className='flex font-medium text-lg'>
          <div>{city},</div>
          <div>{state},</div>
          <div>{country},</div>
          <div>{mobileNumber}</div>
        </div>
        
      </button>
    </>
  )
}

export default Addresscard
