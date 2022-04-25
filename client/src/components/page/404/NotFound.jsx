import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth'

function NotFound() {
  const {authState:{isAuthenticated}} = useContext(AuthContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!isAuthenticated) return navigate('/')
  },[isAuthenticated])
  return (
    <div className="404">

    </div>
  )
}

export default NotFound