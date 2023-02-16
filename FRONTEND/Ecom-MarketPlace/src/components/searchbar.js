import React, { useState } from 'react'; 
import './searchbar.css';
import axios from 'axios';


function Searchbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/searchResult', { query: searchQuery })
      .then((response) => {
        console.log(response.data);
        // Handle successful response from backend
      })
      .catch((error) => {
        // Handle error response from backend
      });
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
