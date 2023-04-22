import { useRef, useState } from "react";
import { FaTimes,FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
function Navbar() {
	const[isMobile,setIsMobile] = useState(false);
	isMobile ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
	return (
		<header className="main-nav">
			<Link to = '/' className="logo">eCommerce</Link>
			<nav 
				className={isMobile ? "menu-link mobile-menu-link" : "menu-link"}
				onClick={() => setIsMobile(false)}>
				<ul>
				<li><Link to='/' className="home">Home</Link></li>
				<li><Link href="/#" className="orders">Orders</Link></li>
				<li><Link to ='/Login' className="login">Login</Link></li>
				<li><Link href="/#" className="orders">Orders</Link></li>
				<li><Link to ='/Login' className="login">Login</Link></li>
				</ul>
				
			</nav>
			<button className="nav-btn" 
			onClick={() => setIsMobile(!isMobile)}>
				{isMobile ?<a><FaTimes/></a>:
				<a><FaBars/></a>}
			</button>
		</header>
	);
}

export default Navbar;
