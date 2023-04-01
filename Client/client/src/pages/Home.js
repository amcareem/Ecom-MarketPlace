import React from 'react'
import Searchbar from "../components/Searchbar";
import ProductCard from "../components/Storecard";
import Container from '../components/Container';
import { Outlet } from 'react-router-dom';
const Home = () => {
  return (
    <>
    <Searchbar />
    {/* <div>
      <h3 className='section-heading'>Search store near you</h3>
    </div>  */}
    {/* <SearchPage/> */}
    {/* </div> */}
    </>
      
  )
}

export default Home;
