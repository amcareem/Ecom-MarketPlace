import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from './context';
import Storesearch from '../pages/Storesearch';
import { useLocation } from 'react-router-dom';
const Searchbar = () => {
  const [searchQuery,setSearchQuery] = useState([]);
  const{searchStoreList,setSearchStoreList} = useGlobalContext();
  // const[storeList, setStoreList] = useState([]);
  // const[searchQuery,setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() =>{
    if(location.pathname === '/Storesearch'){
      const searchQuery = window.localStorage.getItem('searchQuery');
      setSearchQuery(searchQuery);
    }

  },[])

  // const getAll = async() => {
  //   return await axios
  //     .get('http://localhost:4000/api/getAll')
  //     .then((response) => {
  //       setStoreList(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((err) => console.log(err));
    
  // }
  // if(location.pathname !== '/Storesearch'){
  //   setSearchQuery(null)
  // }
  const handleSearch = async (event) => {
    event.preventDefault();
    return await axios
      .post('http://localhost:4000/api/searchResult', { query: searchQuery })
      .then((response) => {
        setSearchStoreList(response.data);
        console.log(response.data);
        window.localStorage.setItem('searchQuery',searchQuery);
        navigate('/Storesearch');    
      })
      .catch((err) => console.log(err));
        
  }
  return (
    <>
    {/* <div className='flex justify-center gap-10 items-center '> */}
    {/* <div className='h-[60vh] md:block hidden w-40 rounded-lg bg-white'></div> */}
    {/* <div className='h-[60vh] w-11/12 md:w-9/12 py-7 px-6 rounded-lg border-black bg-white'> */}
      <form className='font-Inter drop-shadow-sm text-black flex justify-center items-center bg-white w-full h-10 lg:h-12 px-1 lg:px-2 py-2 rounded-xl' onSubmit={handleSearch}>
        <div className='pt-2 hidden sm:block md:text-xl'><ion-icon name="search"></ion-icon></div>
        <input 
          name='item' 
          method='post' 
          autocomplete='off'
          className=" w-10/12 h-9 focus:outline-none rounded-xl px-2 lg:px-2 text-sm lg:text-base" 
          type="search" placeholder="Find your store.." 
          value={searchQuery} 
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit" className="w-3/12 lg:w-2/12 text-xs lg:text-base h-8 lg:h-9 text-white bg-buttonColor hidden sm:flex justify-center items-center rounded-xl">Search</button>
        <button type="submit" className="rounded-xl w-2/12 h-8 lg:h-9 text-white font-bold bg-buttonColor flex justify-center items-center sm:hidden"><ion-icon name="search"></ion-icon></button>
      </form>
    </>
  )
}
export default Searchbar;