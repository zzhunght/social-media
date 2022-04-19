import './App.css';
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/page/Auth/Login';
import Register from './components/page/Auth/Register';
import Home from './components/page/home/home';
import Content from './components/page/Content/Content';
import NavBottom from './components/Nav/NavBottom';
import PostDetails from './components/page/PostDetails/PostDetails';

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={ <Home />} />
        <Route exact path="login" element={ <Login />} />
        <Route exact path="register" element={ <Register/>} />
        <Route exact path="/home" element={ <Content/>} />
        <Route exact path="/post/:id" element={<PostDetails />}  />
    </Routes>
    <NavBottom/>
      
    </BrowserRouter>
  );
}

export default App;
