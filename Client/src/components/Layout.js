import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Header from './Navbar/Navbar';
import Footer from './Footer';
import { useGlobalContext } from './context';
import Loadinscreen from '../pages/Loadinscreen';
const Layout = () => {
  const {isLoading} = useGlobalContext();
  if(isLoading){
    return(
      <Loadinscreen />
    )
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  )
}

export default Layout
