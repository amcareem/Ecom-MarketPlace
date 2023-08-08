import './App.css';
import Home from './pages/Home';
// import Register from  './components/Register';
import Login from './pages/Login';
import {Routes, Route,BrowserRouter} from 'react-router-dom';
import Layout from './components/Layout';
import Storesearch from './pages/Storesearch';
// import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import Shopproductpage from './pages/Shopproductpage';
import Checkoutsuccess from './components/Checkoutsuccess';
import Usercart from './pages/Usercart';
import Checkoutlayout from './pages/Chekout/Layout';
import Checkout from './pages/Chekout/Checkout';
import Addresspage from './pages/Chekout/Addresspage';
import Paymentpage from './pages/Chekout/Paymentpage'
import Deliverypage from './pages/Chekout/Deliverypage'
import Reviewpage from './pages/Chekout/Reviewpage';
import Roleselect from './pages/Roleselect';
import Seller from './pages/sellerSignup/Seller';
import Buyer from './pages/buyerSignup/Buyer';
import Loginrole from './pages/Loginrole';
import Loginpage from './pages/Loginpage';
import Sellerloginpage from './pages/Sellerloginpage';
import Sellerhome from './pages/SellerPages/Sellerhome';
import Productmanagement from './pages/SellerPages/Productmanagement';
import Sellerlayout from './components/SellerComponents/Sellerlayout';
import Ordermanagementpage from './pages/SellerPages/Ordermanagementpage';
import Editproduct from './pages/SellerPages/Editproduct';
import Productdetails from './pages/SellerPages/Productdetails';
import Addproduct from './pages/SellerPages/Addproduct';
import Editorder from './pages/SellerPages/Editorder';
import Sellerprofile from './pages/SellerPages/Sellerprofile';
import Overview from './pages/SellerPages/Overview';
import Addproductinfo from './pages/SellerPages/Addproductinfo';
import Addproductlayout from './pages/SellerPages/Addproductlayout';
import Animation from './pages/Animation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Notfound from './pages/Notfound';
import { useGlobalContext } from './components/context';
// import UserCart from './pages/UserCart';
function App() {
  const {authorizationMessage,setAuthorizationMessage} = useGlobalContext();
  const token = window.localStorage.getItem("token")
  const isAuthorized = async()=>{
    try{
    const res = await axios.get('http://localhost:9000/auth/isUserAuth',{
      headers : {
        "Authorization" : token,
      }
    })
    setAuthorizationMessage(res.data.msg);
    console.log(res);
  }
  catch(err){
    console.log(err);
  }
  }
  const isSellerAuthorized = async()=>{
    try{
      const res = await axios.get('http://localhost:3002/auth/protect',{
        headers : {
          "Authorization" : `Bearer ${token}`, 
        }
      })
      setAuthorizationMessage(res.data.msg);
      console.log(res);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    isAuthorized();
    isSellerAuthorized();
  },[])
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Layout/>}>
            <Route path= '/' index element = {<Home/>} />
            <Route path ="/ShopProductPage/:shopId" element={<Shopproductpage/>}/>
            <Route path='/Storesearch' element={<Storesearch/>} />
            <Route path='/checkout-success' element={<Checkoutsuccess />} />
            <Route path='/user-cart/:userId' element={<Usercart/>} />
            <Route path='/checkout' element={<Checkoutlayout />}>
              <Route path = '/checkout' index element = {<Addresspage/>} />
              <Route path = '/checkout/paymentpage' element = {<Paymentpage/>} />
              <Route path = '/checkout/reviewpage' element = {<Reviewpage/>} />
            </Route>
          </Route>
          <Route path='/Roleselect' element={<Roleselect />}/>
          <Route path ="/buyer-signup" element={<Buyer />}/>
          <Route path='/seller-signup' element={<Seller />} />
          <Route path = '/loginpage' element = {<Loginpage/>} />
          <Route path='/seller-loginpage' element ={<Sellerloginpage />} />
          <Route path='/Loginrole' element = {<Loginrole />} />

          <Route path='/seller' element={<Sellerlayout/>}>
            <Route path='/seller' element={<Sellerhome/>}/>
            <Route path='/seller/seller-profile' element={<Sellerprofile/>} />
            <Route path='/seller/productmanagement-page/product-details' element={<Productmanagement/>} />
            <Route path='/seller/productmanagement-page/edit-products' element={<Editproduct/>} />
            <Route path='/seller/productmanagement-page/add-products' element={<Addproductlayout/>}>
              <Route path='/seller/productmanagement-page/add-products' element={<Addproductinfo />}/>
              <Route path='/seller/productmanagement-page/add-products/overview' element={<Overview />}/>
            </Route>
            <Route path='/seller/ordermanagement-page/order-details' element={<Ordermanagementpage/>} />
            <Route path='/seller/ordermanagement-page/edit-orders' element={<Editorder/>} />
            
          </Route>
          <Route path='/animation-test' element={<Animation/>} />
          <Route path='*' element={<Notfound/>}/>
        </Routes>
          
      </BrowserRouter>
    </>
  );
}

export default App;
