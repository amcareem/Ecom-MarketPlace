import React,{useState} from "react";
// import BreadCrumb from "../components/BreadCrumb";
// import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import axios from 'axios';

const Signup = () => {
  const[user,setUser] = useState(
    {
      name:"",
      email:"",
      password:"",
      confirmPassword:""
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
      .post('http://localhost:9000/auth/register', user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Container className="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="" className="d-flex flex-column gap-15">
                <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" className="form-control"/>
                <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" className="form-control"/>
                {/* <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  className="form-control"
                  value={user.}
                  onChange={handleChange}
                /> */}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={user.password}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="form-control"
                  value={user.confirmPassword}
                  onChange={handleChange}
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button onClick={handleSubmit}className="button border-0">Sign Up</button>
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

export default Signup;