import './App.css';
import React, { useContext, useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools'
import Login from './components/page/Auth/Login';
import Register from './components/page/Auth/Register';
import Home from './components/page/home/home';
import Content from './components/page/Content/Content';
import NavBottom from './components/Nav/NavBottom';
import PostDetails from './components/page/PostDetails/PostDetails';
import MyProfile from './components/page/Profile/MyProfile';
import StrProfile from './components/page/Profile/StrProfile';
import ChatRoom from './components/page/Chat/ChatRoom';
import Mes from './components/page/Chat/Mes';
import { AuthContext } from './context/auth';


function App() {
  const {authState:{isAuthenticated}} = useContext(AuthContext)
  const location = useLocation()

  return (
    <>
    <Routes>
        <Route exact path="/" element={ <Home />} />
        <Route exact path="login" element={ <Login />} />
        <Route exact path="register" element={ <Register/>} />
        { isAuthenticated && <Route exact path="home" element={ <Content/>} />}
        { isAuthenticated && <Route exact path="post/:id" element={<PostDetails />}  />}
        { isAuthenticated && <Route exact path="my-profile" element={<MyProfile />}  />}
        { isAuthenticated && <Route exact path="profile/:id" element={<StrProfile />}  />}
        { isAuthenticated && <Route path="chat" element={ <ChatRoom />}/>}
        { isAuthenticated && <Route path="chat/:id" element={<Mes/>} />}
    </Routes>
    {!location.pathname.startsWith('/chat/') && <NavBottom/> }
    <ReactQueryDevtools initialIsOpen />
    </>
  );
}

export default App;
