import React from 'react'
import Myaccount from './Myaccount'
import Searchbar from '../Searchbar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

const Navbar = () => {
    const[open,setOpen] = useState(false);
    const {user,cartProductCounter} = useGlobalContext();
    const userId = user.userId;
    // if(userInfo){
    //     var uuid = userInfo.user_id;
    // }
    const handleClick = ()=>{
        setOpen(!open);
    }
    open ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
  return (
    <>
     <div className='font-Inter font-semibold w-full flex h-20 px-2 lg:pr-5 lg:pl-8 bg-navColor justify-between text-white items-center'>
        <h1 className='text-xl hidden lg:block'><Link to='/'>Ecommerce</Link></h1>
        <div className= 'w-10/12 lg:w-5/12'><Searchbar/></div>
        <ul className='hidden lg:flex text-md justify-center items-center'>
            <li className='px-4'><Link to='/'>Home</Link></li>
            <li className='px-4'>Orders</li>
            <li className='px-4'><Link to={`/user-cart/${userId}`}>Cart({cartProductCounter})</Link></li>
            <li className='px-4'><Myaccount/></li>
            
        </ul>

        <div onClick={handleClick} className='block lg:hidden text-3xl text-white' >
            {
                open ? <ion-icon name="close"></ion-icon>:
                <ion-icon name="menu"></ion-icon>
            }
        </div>

            <ul className={open ?'p-1 w-[100%] h-screen z-40 bg-navColor items-center fixed top-[80px] left-0 ease-in-out duration-300': 'fixed top-[80px] left-[-100%]'}>
                <li className='p-3 border-b border-gray-600' onClick={handleClick}><Link to='/'>Home</Link></li>
                <li className='p-3 border-b border-gray-600'>Orders</li>
                <li className='p-3 border-b border-gray-600' onClick={handleClick}><Link to={`/user-cart/${userId}`}>Cart</Link></li>
                <li className='p-3 border-b border-gray-600'><Myaccount/></li>
                {/* <li className='p-3 border-b border-gray-600 '><Myaccount/></li> */}
                
            </ul>
            
    </div>
    </>
  )
}

export default Navbar
