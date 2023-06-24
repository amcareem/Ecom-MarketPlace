import { useRef, useState } from "react";
import { FaTimes,FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navlink from "./Navlink.js";
function Navbar() {
	const[open,setOpen] = useState(false);
	// const loginStatus = window.localStorage.getItem("loginStatus");
	// const logout = () =>{
	// 	window.localStorage.clear();
	// 	navigate("/login");
	// }
	// isMobile ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
	return (
		<>
		<nav className='relative bg-black text-sky-400 flex justify-around items-center h-24'>
			<div className='z-50 md:w-auto w-full px-4 flex justify-between'>
				<div className='text-xl'><Link className='no-underline hover:no-underline text-sky-400' to = '/'>eCommerce</Link></div>
				<div className='md:hidden text-3xl'onClick={() =>setOpen(!open)}>
					<ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
				</div>
			</div>
			<ul className='md:flex md:justify-center hidden pt-4 px-3 items-center gap-8'>
				<Navlink />
				</ul>
			<ul className={`md:hidden bg-black absolute w-full h-screen top-0 py-24 pl-4 
                      duration-500 ${open ? "left-0" : "left-[-100%]"}`}>
        		<Navlink/>
      		</ul>
		</nav>
		</>
	);
}

export default Navbar;
