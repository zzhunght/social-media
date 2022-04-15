import React, { useContext, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { AuthContext } from '../../../context/auth'
import './home.css'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const {authState:{isAuthenticated,authLoading}} = useContext(AuthContext)
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
        return navigate("/login");
    }
    if(isAuthenticated) return navigate("/home");
  },[isAuthenticated,authLoading]);
  return (
      <div className="wr-rec">
        {authLoading && (
          <div className="loading">
            Đang đăng nhập <LoadingOutlined />
          </div>
        )}
      </div>
  )
}
