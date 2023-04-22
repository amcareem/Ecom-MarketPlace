import React, { useState } from 'react';
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Submitting registration:', username, password);
      // You can add code here to submit the username, password, and user type to a backend for registration
    };
  
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <label>
            User Type:
            <select>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };
  export default Register;