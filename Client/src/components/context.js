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
    const[cartList,setCartList] = useState([]);
    const[authorizationMessage,setAuthorizationMessage] = useState('');
      
    
    return <AppContext.Provider 
    value={{authorizationMessage,setAuthorizationMessage,storeList,setStoreList,productList,setProductList,loginStatus,setLoginStatus,cartList,setCartList,searchQuery,setSearchQuery,searchStoreList,setSearchStoreList,cartProductCounter,setCartProductCounter,cartTotalPrice,setCartTotalPrice
    ,userAddress,setUserAddress,defaultAddress,setDefaultAddress}}>
        {children}
    </AppContext.Provider>  
}

const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppContext,AppProvider,useGlobalContext};