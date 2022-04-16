import React, {useState, useEffect} from "react"
import logo from './logo.svg';
import './App.css';
import axios from "axios"
import Login from "./components/login"
import Bar from "./components/Bar"
import Home from "./components/Home";
import Profile from "./components/Profile"
import {BrowserRouter,Route, Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Bar>
    </Bar>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>


  );
}

export default App;
