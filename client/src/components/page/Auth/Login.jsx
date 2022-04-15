import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/auth'
import LoginForm from '../../Form/LoginForm'
import './AuthStyle.css'

function Login() {
  let navigate = useNavigate();
  const {authState:{isAuthenticated}} = useContext(AuthContext)
  useEffect(()=>{
    if(isAuthenticated) return navigate("/home");
  },[isAuthenticated])
  return (
    <div className="auth-page">
        <div className="auth-ct">
            <div className="auth-ct-left">
                <p>Đăng nhập vào tài khoản của bạn</p>
            </div>
            <div className="auht-ct-right">
              <LoginForm />
                
            </div>
        </div>
    </div>
  )
}

export default Login