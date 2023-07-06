import React from 'react'
import Introimage from '../Images/ecom.png';

const Introduction = () => {
  return (
    <>
        <div className='flex justify-center items-center w-full font-Inter gap-2'>
            <div className='w-1/2 pt-8 md:pt-12'>
                <img src={Introimage} className='w-11/12'></img>
            </div>
            <div className='w-1/2 flex flex-col gap-4 md:gap-6'>
                <div className='text-3xl md:text-7xl lg:text-8xl font-extrabold font-Inter'>Your<br/>world of store<br/>is here </div>
                <div><button className='bg-buttonColor font-medium text-white w-32 h-9 text-md md:w-36 md:h-12 md:text-lg rounded-md'>Shop now</button></div>
            </div>
            
        </div> 
    </>
  )
}

export default Introduction
