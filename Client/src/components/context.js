import React,{useContext, useEffect, useState} from "react";
import axios from 'axios';
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const[isLoading, setIsLoading] = useState(true);
    const[storeList,setStoreList] = useState([]);
    const[searchStoreList,setSearchStoreList] = useState([]);
    const[clickSearch,setClickSearch] = useState(false);
    const[searchQuery,setSearchQuery] = useState("");
    const[shopIdForProducts,setShopIdForProducts] = useState("");
    const[productList,setProductList] = useState([]);
    const[loginStatus,setLoginStatus] = useState(false);
    const[userInfo,setUserInfo] = useState({
      userName : "",
      userId : "",
      accessToken: "",
      email: ""
    })
    const[cartProducts,setCartProducts] = useState([]);
    // const getAll = async() => {
    //     try {
    //       // Handle successful response from backend
    //       var response =  await  axios.get('http://localhost:4000/api/getAll')
          
    //       const data = await response.data;
    //       console.log(response.data);
    //       setStoreList(data);
    //     } catch (error) {
    //       // Handle error response from backend
    //       console.log(error);
    //     }
        
    //   }
    // const handleSearch = async (event) => {
    //     // event.preventDefault();
    //     try {
    //       // Handle successful response from backend
    //       const response =  await  axios.post('http://localhost:4000/api/searchResult', { query: searchQuery });
    //       console.log(response.data);
    //       setStoreList(response.data);
    //     } catch (error) {
    //       // Handle error response from backend
    //       console.log(error);
    //     }
    //   }
      // useEffect(() =>{
      //   if(clickSearch === true){
      //     console.log(clickSearch);
      //     clickSearch = false;  
          
      //   }
      //   getAll();
      // },[]);
    return <AppContext.Provider 
    value={{storeList,setStoreList,productList,setProductList,userInfo,setUserInfo,loginStatus,setLoginStatus,cartProducts,setCartProducts,searchQuery,setSearchQuery,searchStoreList,setSearchStoreList}}>
        {children}
    </AppContext.Provider>  
}

const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppContext,AppProvider,useGlobalContext};