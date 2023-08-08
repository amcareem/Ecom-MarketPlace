import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Header from './Navbar/Navbar';
import Footer from './Footer';
const Layout = () => {
  
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  )
}

export default Layout
