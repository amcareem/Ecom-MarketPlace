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
// import UserCart from './pages/UserCart';
function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Layout/>}>
            <Route path= '/' index element = {<Home/>} /> 
            
            {/* <Route path ="/ForgotPassword" element={<ForgotPassword />} />
            <Route path ="/Signup" element={<Signup />}/>
            <Route path='/UserCart' element={<UserCart/>}/> */}
            <Route path ="/ShopProductPage/:shopId" element={<Shopproductpage/>}/>
            <Route path='/Storesearch' element={<Storesearch/>} />
          </Route>
          <Route path ="/Signup" element={<Signup />}/>
          <Route path = '/Login' element = {<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
