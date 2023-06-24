import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Myaccount = (props) => {
  const navigate = useNavigate();
    const loginStatus = window.localStorage.getItem("loginStatus");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const logout = () =>{
		window.localStorage.clear();
		navigate("/login");
    }
  return (
    <>
      {(!loginStatus)?
            <Link to='/Login' className='lg:text-lg lg:border border-white rounded-xl lg:px-3 lg:py-1'>login</Link>
            :<div className='flex-col'>
            <div className='flex gap-2 peer lg:h-10 items-center'>
              <div>My account</div>
              {/* {
                (dropdown) ? <div className='mt-1'><ion-icon onClick={()=> setDropdown(!dropdown)} name="caret-up-outline"></ion-icon></div>
                : <div className='mt-1' onClick={()=> setDropdown(!dropdown)}><ion-icon name="caret-down-outline"></ion-icon></div>
              } */}
              <div className='mt-1'><ion-icon name="caret-down-outline"></ion-icon></div>
            </div>
                
                <div className={`mr-6 lg:mr-0 collapse hover:visible peer-hover:visible rounded-lg lg:absolute lg:w-1/6 right-4 lg:right-6  w-auto bg-navColor border border-white`}>
                    <ul className=''>
                        <li className='m-auto border-b px-10 border-white p-1'>profile</li>
                        <li className='border-b px-10 border-white p-1'>wishlist</li>
                        <li className='border-b px-10 p-1'><button onClick={logout}>logout</button></li>
                      
                    </ul>
                </div>
          </div>
          }
    </>
  )
}

export default Myaccount
