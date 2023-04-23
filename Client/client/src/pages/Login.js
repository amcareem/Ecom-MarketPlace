import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import axios from 'axios';
import { useGlobalContext } from '../components/context';

const Login = () => {
  const navigate = useNavigate();
  const{setLoginStatus,userName,setUserName} = useGlobalContext();
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
    return await axios
      .post('http://localhost:9000/auth/login', user)
      .then((response) => {
        console.log(response.data);
        setUserName(response.data.user.user_name);
        setLoginStatus(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
    <Container className="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form onSubmit={handleSubmit}className="d-flex flex-column gap-15">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={user.email}
                  onChange={handleChange}
                  className='form-control'
                  />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  className='form-control'
                />
                <div>
                  <Link to="/ForgotPassword" className='text-decoration-none mt-4' >Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <button  className="button border-0" type="submit">
                      Login
                    </button>
                    
                    <Link to="/Signup" className="button signup text-decoration-none">
                      SignUp
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;