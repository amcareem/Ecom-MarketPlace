import React, { useState } from 'react'; 
import './searchbar.css';
import axios from 'axios';


function Searchbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      // Handle successful response from backend
      const response =  await  axios.post('http://localhost:3001/api/searchResult', { query: searchQuery });
      console.log(response.data);
    } catch (error) {
      // Handle error response from backend
      console.log(error);
    }
    }


    
  return (
    <div>
      <form className="d-flex" id ='container' onSubmit={handleSearch}>
        <input name='item' className="form-control search-box" type="text" placeholder="Search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
        <button className="btn btn-secondary search" type="submit">Search</button>
      </form>
    </div>
  )
}
export default Searchbar;
