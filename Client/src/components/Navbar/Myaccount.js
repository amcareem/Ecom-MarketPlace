import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
const Myaccount = (props) => {
  const navigate = useNavigate();
    const {authorizationMessage,setAuthorizationMessage} = useGlobalContext();
    const logout = () =>{
		window.localStorage.clear();
    setAuthorizationMessage(null);
		navigate("/loginrole");
    }
  return (
    <>
      {(authorizationMessage === 'authorized')?
           <div className='flex-col'>
           <div className='flex gap-2 peer lg:h-10 items-center'>
             <div>My account</div>
             <div className='mt-1'><ion-icon name="caret-down-outline"></ion-icon></div>
           </div>
               
               <div className={`mr-6 lg:mr-0 transition duration-50 hidden lg:block lg:opacity-0 hover:block peer-hover:block lg:hover:opacity-100 lg:peer-hover:opacity-100 rounded-md lg:absolute lg:w-fit right-4 lg:right-6  w-auto bg-zinc-800 border border-slate-400 text-slate-300`}>
                   <ul className=''>
                       <li className='m-auto border-b px-4 py-2 border-slate-400 text-sm p-1'>
                         <div className='flex gap-3 justify-start items-center'>
                           <div className='pt-1'><ion-icon name="person-sharp"></ion-icon></div>
                           <div>profile</div>
                         </div>
                       </li>
                       <li className='m-auto border-b px-4 py-2 border-slate-400 text-sm p-1'>
                         <div className='flex gap-3 justify-start items-center'>
                           <div className='pt-1'><ion-icon name="bag-handle-sharp"></ion-icon></div>
                           <div>Orders</div>
                         </div>
                       </li>
                       <li className='m-auto border-b px-4 py-2 border-slate-400 text-sm p-1'>
                         <div className='flex gap-3 justify-start items-center'>
                           <div className='pt-1'><ion-icon name="log-out-sharp"></ion-icon></div>
                           <div><button onClick={()=>logout()}>Logout</button></div>
                         </div>
                       </li>
                       <li className='m-auto border-b px-4 py-2 border-slate-400 text-sm p-1'>
                         <div className='flex gap-3 justify-start items-center'>
                           <div className='pt-1'><ion-icon name="information-circle-sharp"></ion-icon></div>
                           <div>Help and query</div>
                         </div>
                       </li>
                   </ul>
               </div>
         </div>
            : <Link to='/Loginrole' className='lg:text-base lg:border-2 font-semibold border-white rounded-xl lg:px-3 lg:py-1'>Login</Link>
          }
    </>
  )
}

export default Myaccount
