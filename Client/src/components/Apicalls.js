// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useGlobalContext } from './context';

// const {searchQuery,setSearchStoreList} = useGlobalContext();
// const navigate = useNavigate();

// export const handleSearch = async (event) => {
//     event.preventDefault();
//     return await axios
//       .post('http://localhost:4000/api/searchResult', { query: searchQuery })
//       .then((response) => {
//         setSearchStoreList(response.data);
//         console.log(response.data);
//         navigate('/Storesearch');
//       })
//       .catch((err) => console.log(err));
      
// }