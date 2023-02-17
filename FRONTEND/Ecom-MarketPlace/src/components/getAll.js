import axios from 'axios';
var response;
async function getAll(){ 
  try {
    // Handle successful response from backend
    response =  await  axios.get('http://localhost:3001/api/getAll')
    console.log(response.data);
  } catch (error) {
    // Handle error response from backend
    console.log(error);
  }
  
}

export default getAll;

