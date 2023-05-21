"use client";
import React, { useState } from 'react';
import './App.css';

const Register = ({registerEmail, registerName, registerPassword, setRegisterEmail, setRegisterName, setRegisterPassword, handleRegisterSubmit, togglePages})=>{
    return (
    <div className="form-container">
    <h1 className="form-title">Register</h1>
    <form className="form" onSubmit={handleRegisterSubmit}>
      <label htmlFor="registerName" className="form-label">
        Name:
      </label>
      <input
        type="text"
        id="registerName"
        className="form-input"
        value={registerName}
        onChange={(e) => setRegisterName(e.target.value)}
        required
      />
      <label htmlFor="registerEmail" className="form-label">
        Email:
      </label>
      <input
        type="email"
        id="registerEmail"
        className="form-input"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
        required
      />
      <label htmlFor="registerPassword" className="form-label">
        Password:
      </label>
      <input
        type="password"
        id="registerPassword"
        className="form-input"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
        required
      />
      <button type="submit" className="form-button">
        Register
      </button>

      <h5 onClick={togglePages} style={{alignSelf:'center'}}>Already Have an Account?</h5>

    </form>
  </div>);
}

const Login = ({loginEmail, loginPassword, setLoginEmail, setLoginPassword, handleLoginSubmit, togglePages}) => {
  return (
    <div className="form-container">
    <h1 className="form-title">Login</h1>
    <form className="form" onSubmit={handleLoginSubmit}>
      <label htmlFor="loginEmail" className="form-label">
        Email:
      </label>
      <input
        type="email"
        id="loginEmail"
        className="form-input"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        required
      />
      <label htmlFor="loginPassword" className="form-label">
        Password:
      </label>
      <input
        type="password"
        id="loginPassword"
        className="form-input"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        required
      />
      <button type="submit" className="form-button">
        Login
      </button>

      <h5 onClick={togglePages} style={{alignSelf:'center'}}>Sign Up?</h5>
    </form>
  </div>
  );
}

const App = () => {
  const [isLogin, setIsLogin] = useState(1);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    
    if(loginEmail === 'admin@gmail.com' && loginPassword === 'admin'){
      window.location.href = '/temp'
    }
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    let userId = Math.random();
    localStorage.setItem('user', JSON.stringify({
      name: registerName,
      email: registerEmail, 
      password: registerPassword,
      id: userId
    }))

    window.location.href = '/form'
  };

  const togglePages = () => {
    setIsLogin(isLogin^1);
  }

  return (
    <div className="container">
      {
        isLogin ? 
          <Login 
            loginEmail={loginEmail} 
            setLoginEmail={setLoginEmail} 
            loginPassword={loginPassword} 
            setLoginPassword={setLoginPassword} 
            handleLoginSubmit={handleLoginSubmit}
            togglePages ={togglePages}
            /> 
          : 
          <Register 
            registerName={registerName} 
            setRegisterEmail={setRegisterEmail} 
            setRegisterName={setRegisterName}
            setRegisterPassword={setRegisterPassword}
            registerEmail={registerEmail}
            registerPassword={registerPassword}
            handleRegisterSubmit={handleRegisterSubmit}
            togglePages ={togglePages}
            
            />}
    </div>
  );
};

export default App;
