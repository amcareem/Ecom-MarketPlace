import React from 'react'
import Searchbar from "../components/Searchbar";
import { Outlet } from 'react-router-dom';
import Storehub from '../components/Storehub';
import Introduction from '../components/Introduction';

const Home = () => {
  return (
    <>
    <div className='bg-mybg h-[45vh] px-2 pt-14 md:h-screen md:px-12 md:pt-28'>
      <Introduction/>
    </div>
    
    <div className='bg-navColor w-full h-[60vh] md:h-[70vh] pt-2 px-2'>
    <div className='font-Inter ml-6 my-3 text-lg md:text-2xl md:ml-32 md:my-6 text-white'>Top store picks for you</div>
    <Storehub/></div>
    <div className='h screen'></div>
    
    
    {/* <h1>hello</h1> */}
    {/* <div className='mx-auto my-16'>
      <Searchbar />
    </div> */}
      
    {/* <div>
      <h3 className='section-heading'>Search store near you</h3>
    </div>  */}
    {/* <SearchPage/> */}
    {/* </div> */}
    </>
      
  )
}

export default Home;
