import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useGlobalContext } from '../components/context';
import { motion } from 'framer-motion'

const Login = () => {
  const navigate = useNavigate();
  const{setLoginStatus,setUserInfo} = useGlobalContext();
  const{authorizationMessage,setAuthorizationMessage,getCartDetails} = useGlobalContext();
  const[user,setUser] = useState(
    {
      email:"",
      password:""
    }
  )
  const handleChange = (e) =>{
    const { name,value} = e.target;
    setUser({
      ...user,
      [name] : value
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res1 =  await axios
      .post('http://localhost:9000/auth/login', user)
      .then((response) => {
        console.log(response.data);
        window.localStorage.setItem("token",response.data.token);
        // window.localStorage.setItem("userInfo",JSON.stringify(response.data.user));
        setUser({
          userId : response.data.user.user_id,
          userName: response.data.user.user_name,
          mobileNumber: response.data.user.mobile_number,
          email: response.data.user.email,
        })
        setAuthorizationMessage('authorized');

        navigate("/");
        return response.data.user;
      })
      .catch((err) => console.log(err));
      const res2 = await getCartDetails(res1.user_id);
      console.log(res2);
  }

  return (
    <>
    {(authorizationMessage === 'authorized')?
    <div className='w-96 h-28 mx-auto mt-32 text-buttonColor rounded-lg bg-white font-semibold text-lg flex justify-center items-center'>You have already logged in...</div>:
    <motion.div
    initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{ duration:0.4 ,type : ''}}
    className="h-fit bg-white w-[70%] py-6 px-10 drop-shadow-lg rounded-lg">
      <div className="">
      <h2 className="text-center text-2xl font-bold leading-9 text-gray-900">
          Log in as a buyer
      </h2>
    </div>
      <div className="mt-10 ">
      <form onSubmit={handleSubmit} action="" className="space-y-6">
      <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Name
          </label>
          <div className="mt-2">
              <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="email" 
                     className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
      </div>
      <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to><div className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </div></Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange} 
                  placeholder="password"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-buttonColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to='/Roleselect'><div className="font-semibold leading-6 text-buttonColor">
              Create account
            </div>
            </Link>
          </p>
        </div>
      </motion.div>
}
    </>
  );
};

export default Login;