import { LoadingOutlined } from '@ant-design/icons'
import { message } from 'antd'
import React,{useContext, useState} from 'react'
import {Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import './FormStyle.css'
function LoginForm() {
    const [loading,setLoading] = useState(false)
    const {loginUser} = useContext(AuthContext)
    const [user,setUser] = useState({
        email:'',
        password:''
    })
    const onFormChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async ()=>{
        setLoading(true)
        const res = await loginUser(user)
        if(!res.success) {
            message.error(res.message ||'Tài khoản hoặc mật khẩu không chính xác')
        }
        setLoading(false)
    }
    return (
    <div className="form">
        <div className="form-group">
            <input
             type="text" 
             name="email"
             placeholder='Email'
             value={user.email}
             onChange={(e) => onFormChange(e)}
            />
        </div>
        <div className="form-group">
            <input
             type="password" 
             name="password"
             placeholder='Mật khẩu'
             value={user.password}
             onChange={(e) => onFormChange(e)}
            />
        </div>

        <button
         className="btn btn-primary"
         onClick={onSubmit}
         disabled={loading}
        > 
            {loading ? <LoadingOutlined />: 'Đăng Nhập '} 
        </button>
        <hr />
        <button className="btn btn-primary register">
            <Link to="/register">
             Đăng ký
            </Link>
        </button>
    </div>
  )
}

export default LoginForm