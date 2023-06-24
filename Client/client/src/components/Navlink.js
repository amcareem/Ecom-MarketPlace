import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Navlink = () => {
    const navigate = useNavigate();
    const loginStatus = window.localStorage.getItem("loginStatus");
    const logout = () =>{
		window.localStorage.clear();
		navigate("/login");
	}
  return (
    <>
        <li><Link className='no-underline hover:no-underline text-sky-400' to='/'>Home</Link></li>
		<li><Link className='no-underline hover:no-underline text-sky-400' href="/#">Orders</Link></li>
				{/* <li><Link to ='/Login' className="login">Login</Link></li> */}
		<li><Link className='no-underline hover:no-underline text-sky-400' to='/userCart'>cart</Link></li>
		<li>{(!loginStatus)
			? <Link className='no-underline hover:no-underline text-sky-400' to ='/Login'>login</Link> 
			: <div className='flex-col'>
			    <div className='flex gap-2 peer md:h-10 items-center'>
				<div >My Account</div>
				 {/* {
						(dropdown) ? <div className='mt-1'><ion-icon onClick={()=> setDropdown(!dropdown)} name="caret-up-outline"></ion-icon></div>
						: <div className='mt-1' onClick={()=> setDropdown(!dropdown)}><ion-icon name="caret-down-outline"></ion-icon></div>
					  } */}
					  <div className='mt-1'><ion-icon name="caret-down-outline"></ion-icon></div>
					</div>
						
						<div className={`hover:block peer-hover:block rounded-md md:absolute md:w-1/6 lg:right-48 md:right-24 bg-gray-900`}>
							<ul className=''>
								<li className='border-b  border-cyan-700'>profile</li>
								<li className='border-b  border-cyan-700'>wishlist</li>
								<li className='border-b  border-cyan-700'><button onClick={logout}>logout</button></li>
							  
							</ul>
						</div>
				  </div>
				}</li>	 
    </>
  )
}

export default Navlink
