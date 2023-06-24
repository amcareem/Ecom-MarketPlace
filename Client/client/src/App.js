import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
// import Register from  './components/Register';
import Login from './pages/Login';
import {Routes, Route,BrowserRouter} from 'react-router-dom';
import Layout from './components/Layout';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import ShopProductPage from './pages/ShopProductPage';
import UserCart from './pages/UserCart';
// getAll();
function App() {
  
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Layout/>}>
            <Route path= '/' index element = {<Home/>} />
            
            <Route path ="/ForgotPassword" element={<ForgotPassword />} />
            <Route path ="/Signup" element={<Signup />}/>
            <Route path ="/ShopProductPage/:shopId" element={<ShopProductPage/>}/>
            <Route path='/UserCart' element={<UserCart/>}/>
          </Route>
          <Route path = '/Login' element = {<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
