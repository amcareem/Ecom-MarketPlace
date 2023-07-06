import React,{useContext, useEffect, useState} from "react";
import axios from 'axios';
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const token = window.localStorage.getItem("token");
    const[isLoading, setIsLoading] = useState(true);
    const[storeList,setStoreList] = useState([]);
    const[searchStoreList,setSearchStoreList] = useState([]);
    const[clickSearch,setClickSearch] = useState(false);
    const[searchQuery,setSearchQuery] = useState("");
    const[shopIdForProducts,setShopIdForProducts] = useState("");
    const[productList,setProductList] = useState([]);
    const[loginStatus,setLoginStatus] = useState(false);
    const[cartProductCounter,setCartProductCounter] = useState(0);
    const[cartTotalPrice,setCartTotalPrice] = useState(0);
    const[userAddress,setUserAddress] = useState([]);
    const[defaultAddress,setDefaultAddress] = useState("");
    const[userInfo,setUserInfo] = useState({
      userName : "",
      userId : "",
      accessToken: "",
      email: ""
    })
    const[cartList,setCartList] = useState([]);
    // useEffect(() =>{
    //     isAuthorized();
    // },[]);
    // const isAuthorized = async()=>{
    //   return await axios
    //   .get('http://localhost:9000/auth/isUserAuth',{
    //     headers : {
    //         "Authorization" : window.localStorage.getItem("token"), 
    //       }
    //   })
    //   .then((res)=>{
    //     console.log(res);
    //     setLoginStatus(true)
    //   })
    //   .catch((err)=>{
    //     console.log(err);
    //   })
    // }
    // console.log(loginStatus);
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
      
    return <AppContext.Provider 
    value={{storeList,setStoreList,productList,setProductList,userInfo,setUserInfo,loginStatus,setLoginStatus,cartList,setCartList,searchQuery,setSearchQuery,searchStoreList,setSearchStoreList,cartProductCounter,setCartProductCounter,cartTotalPrice,setCartTotalPrice
    ,userAddress,setUserAddress,defaultAddress,setDefaultAddress}}>
        {children}
    </AppContext.Provider>  
}

const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppContext,AppProvider,useGlobalContext};