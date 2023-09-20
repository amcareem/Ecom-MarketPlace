import React, { useEffect } from 'react'
import { useGlobalContext } from '../../components/context'
import axios from 'axios';
import Ordercard from './Ordercard';
const Orderdetails = () => {
  const {user,orderList,setOrderList} = useGlobalContext();
  

  if(orderList.length === 0){
    return(
      <>
      <div className='w-full h-screen pl-4'>
        <div>You haven't ordered any item yet...</div>
      </div>
        
      </>
    )
  }
  else{
    return (
    <>
      <div className='w-full flex flex-col gap-10'>
        {
          orderList.map((order) =>{
            return <Ordercard
              orderItem = {order}
            />
          })
        }
      </div>
    </>
  )
  }
  
}

export default Orderdetails

