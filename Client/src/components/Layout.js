import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Header from './Navbar/Navbar';
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout
