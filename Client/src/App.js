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
// import UserCart from './pages/UserCart';
function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Layout/>}>
            <Route path= '/' index element = {<Home/>} /> 
            
            {/* <Route path ="/ForgotPassword" element={<ForgotPassword />} />
            <Route path='/UserCart' element={<UserCart/>}/> */}
            <Route path ="/ShopProductPage/:shopId" element={<Shopproductpage/>}/>
            <Route path='/Storesearch' element={<Storesearch/>} />
            <Route path='/checkout-success' element={<Checkoutsuccess />} />
            <Route path='/user-cart/:userId' element={<Usercart/>} />
            <Route path='/checkout' element={<Checkoutlayout />}>
              <Route path = '/checkout' index element = {<Addresspage/>} />
              <Route path = '/checkout/paymentpage' element = {<Paymentpage/>} />
              <Route path = '/checkout/deliverypage' element = {<Deliverypage/>} />
            </Route>
          </Route>
          <Route path ="/Signup" element={<Signup />}/>
          <Route path = '/Login' element = {<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
