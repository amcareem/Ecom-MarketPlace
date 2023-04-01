import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from './Container';
import { useGlobalContext } from './context';
import StoreCard from './Storecard';

const Searchbar = () => {
  const {storeList,setStoreList} = useGlobalContext();
  // const[storeList, setStoreList] = useState([]);
  const[searchQuery,setSearchQuery] = useState("");

  useEffect(() =>{
    getAll();
  },[])

  const getAll = async() => {
    return await axios
      .get('http://localhost:4000/api/getAll')
      .then((response) => {
        setStoreList(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
    
  }
  const handleSearch = async (event) => {
    event.preventDefault();
    return await axios
      .post('http://localhost:4000/api/searchResult', { query: searchQuery })
      .then((response) => {
        setStoreList(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <form className="d-flex" id ='container'onSubmit={handleSearch}>
        <input 
          name='item' 
          method='post' 
          className="search-box" 
          type="search" placeholder="Search" 
          value={searchQuery} 
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
        
      </form>
      <div className='SearchPage'>
        {
          storeList.length >=1 ? storeList.filter((currMovie,idx) => idx < 6).map((currMovie) =>{
            return <StoreCard storeName = {currMovie._source.storeName} shopId = {currMovie._source.shopId}/>
          }): <div className='noResult'>No result found...</div>
        }
        </div>
    </div>
  )
}

export default Searchbar;

