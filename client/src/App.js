import './App.css';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/page/Auth/Login';
import Register from './components/page/Auth/Register';
import Home from './components/page/home/home';
import Content from './components/page/Content/Content';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={ <Home />} />
        <Route exact path="login" element={ <Login />} />
        <Route exact path="register" element={ <Register/>} />
        <Route exact path="/home" element={ <Content/>} />
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
