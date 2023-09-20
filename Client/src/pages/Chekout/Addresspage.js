import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from './Modal';
import Addressform from './Adressform';
import axios from 'axios';
import { useGlobalContext } from '../../components/context';
import Addresscard from './Addresscard';

const Addresspage = () => {
  const [isOpen,setIsOpen] = useState(false);
  const {userAddress,setUserAddress,defaultAddress,setDefaultAddress,user} = useGlobalContext();
  // const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  const userId = user.userId;
  useEffect(()=>{
    getUserAddress();
  },[])
  const getUserAddress = async() =>{
    return await axios
    .get(`http://localhost:9000/getUserAddress/${userId}`)
    .then((res)=>{
      console.log(res.data);
      if(res.data.length === 1){
        setDefaultAddress(res.data[0].id)
      }
      res.data.map((curr)=>{
        if(curr.is_default)setDefaultAddress(curr.id);
      })
      
      setUserAddress(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  // const getDefaultAddress = async()=>{
  //   return await axios
  //   .get(`http://localhost:9000/getDefaultAddress`)
  //   .then((res)=>{
  //     console.log(res.data);
  //     setDefaultAddress(res.data.id);
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })
  // }
  return (
    <>
      <div className='font-Inter'>
        <button onClick={()=>setIsOpen(true)} className='cursor-default border-[2px] lg:border-[3px] rounded-lg border-dashed border-gray-600 text-gray-600 w-full h-10 lg:h-16 bg-white text-base lg:text-xl font-semibold flex items-center justify-center'>+ Use this address</button>
        <Modal open={isOpen} onClose={()=>setIsOpen(false)}>
          <Addressform onClose={()=>setIsOpen(false)}/>
        </Modal>
        <div className=''>
        {
          userAddress.map((curr) =>{
            return <Addresscard 
              userName = {curr.full_name}
              addressLine1 = {curr.address_line1}
              city = {curr.city}
              country = {curr.country}
              state = {curr.state}
              postalCode = {curr.postal_code}
              mobileNumber = {curr.mobile_number}
              addressId = {curr.id}
              isDefault = {curr.is_default}
            />
          })
        }
        </div>
      </div>
    </>
  )
}

export default Addresspage
