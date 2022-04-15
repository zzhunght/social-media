import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';
import RegisterForm from '../../Form/RegisterForm'
import './AuthStyle.css'
function Register() {
  let navigate = useNavigate();
  const {authState:{isAuthenticated}} = useContext(AuthContext)
  useEffect(()=>{
    if(isAuthenticated) return navigate("/home");
  },[isAuthenticated])
  return (
    <div className="auth-page">
        <div className="auth-ct">
            <div className="auth-ct-left">
                <p>Đăng ký tài khoản của bạn</p>
            </div>
            <div className="auht-ct-right">
              <RegisterForm />
            </div>
        </div>
    </div>
  )
}

export default Register