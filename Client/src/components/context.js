import React,{useContext, useEffect, useState} from "react";
import axios from 'axios';
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const token = window.localStorage.getItem("token");
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
    const[isLoading,setIsLoading] = useState(false)
    const[user,setUser] = useState({
        userId : '',
        userName : '',
        mobileNumber : '',
        email : ''
    })  
    useEffect(()=>{
        setIsLoading(true);
        getUserDetails();
      },[])
      const getUserDetails = async() =>{
        try{
            const res1 = await isAuthorized();
            console.log(res1);
            const res2 = await getCartDetails(res1.user_id);
            console.log(res2);
            setTimeout(()=>{
                setIsLoading(false);
            },1000)
        }
        catch(err){
          setIsLoading(false)
            console.log(err);
        }
    }
    const isAuthorized = async()=>{
        try{
        const res = await axios.get('http://localhost:9000/auth/isUserAuth',{
          headers : {
            "Authorization" : window.localStorage.getItem("token"),
          }
        })
        setAuthorizationMessage(res.data.msg);
        setUser({
            userId: res.data.user.user_id,
            userName: res.data.user.user_name,
            mobileNumber: res.data.user.mobile_number,
            email: res.data.user.email
        })
        return res.data.user;
      }
      catch(err){
        console.log(err);
      }
      }
      const getCartDetails = async(userId) =>{
        return await axios
        .get(`http://localhost:9000/cart/getCartDetails/${userId}`,{
            headers : {
                "Authorization" : window.localStorage.getItem("token"), 
              }
        })
        .then((res) =>{
            setCartList(res.data);
            cartTotal(res.data);
            return res.data
        })
        .catch((err) =>{
            console.log(err.msg);
        })
       }
       const cartTotal = (cartList) =>{
        let totalPrice = 0;
        let totalQuantity = 0;
        cartList.forEach((item) =>{
          totalPrice += item.productAmount * item.quantity;
          totalQuantity += item.quantity;
        })
        setCartProductCounter(totalQuantity);
        setCartTotalPrice(totalPrice);
        window.localStorage.setItem("totalQuantity",JSON.stringify(totalQuantity));
        window.localStorage.setItem("totalPrice",JSON.stringify(totalPrice));
       }
    return <AppContext.Provider 
    value={{getCartDetails,user,setUser,authorizationMessage,setAuthorizationMessage,storeList,setStoreList,productList,setProductList,loginStatus,setLoginStatus,cartList,setCartList,searchQuery,setSearchQuery,searchStoreList,setSearchStoreList,cartProductCounter,setCartProductCounter,cartTotalPrice,setCartTotalPrice
    ,userAddress,setUserAddress,defaultAddress,setDefaultAddress,isLoading,setIsLoading}}>
        {children}
    </AppContext.Provider>  
}

const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppContext,AppProvider,useGlobalContext};