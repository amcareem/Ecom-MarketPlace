import React from 'react'
import Searchbar from "../components/Searchbar";
import { Outlet } from 'react-router-dom';
import Storehub from '../components/Storehub';
import Introduction from '../components/Introduction';
import offer from '../Images/offer.jpg'
const Home = () => {
  return (
    <>
    <div className='flex flex-col gap-8'>
    <div className='bg-white w-screen h-80 flex justify-center items-center px-10 py-3'>
      <Introduction/>
    </div>
    <div className='bg-white flex w-screen h-[70vh] px-10 py-3 gap-4'>
    <div className=' bg-slate-200/60 border-black  flex flex-col w-[75%] h-full gap-6 px-10'>
      <div className='font-Inter text-lg md:text-2xl font-semibold text-black pl-2 mt-8'>Top store picks for you</div>
      <div className='flex  w-full rounded-lg lg:w-full border-black lg:h-96'>
        <Storehub/>
      </div>
    </div>
    <div className='w-[25%]  flex justify-center items-center border-black'>
            <img src={offer} className='w-full h-full rounded-sm'></img>
        </div>
    </div>
    <div className='bg-white h-screen'></div>
    
    </div>
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
