import React, {useState, useEffect, useContext} from "react"
import logo from './logo.svg';
import './App.css';
import axios from "axios"
import AuthContext from "./context/AuthProvider"
import Login from "./components/login"
import Bar from "./components/Bar"
import Home from "./components/Home";
import Profile from "./components/Profile"
import {BrowserRouter,Route, Routes} from "react-router-dom";

function App() {
  const {setAuth} = useContext(AuthContext);
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    const loggedInRole = localStorage.getItem('role')
    if(loggedInUser){
      setAuth({username:loggedInUser, role:loggedInRole, "logged_in":true})
    }
  })

  return (
    <BrowserRouter>
    <Bar>
    </Bar>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>


  );
}

export default App;
