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
import Users from "./components/Users";
import Disciplines from "./components/Disciplines";
import Curriculum from "./components/Curriculum";
import Contract from "./components/Contract";
import Optionals from "./components/Optionals";
import ValidRole from "./context/RoleValidation";
import ApproveOptionals from "./components/ApproveOptionals";
import Documents from "./components/Documents"

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
      <Route path="/users" element={<Users/>}/>
      <Route path="/disciplines" element={<Disciplines/>}/>
      <Route path="/curriculum" element={<Curriculum/>}/>
      <Route path="/optionals" element={ValidRole(Optionals, "/optionals")}/>
      <Route path="/contract" element={ValidRole(Contract, "/contract")}/>
      <Route path="/approve_optionals" element={ValidRole(ApproveOptionals,"/approve_optionals")}/>
      <Route path="/documents" element={ValidRole(Documents, "/documents")}/>
    </Routes>
    </BrowserRouter>


  );
}

export default App
