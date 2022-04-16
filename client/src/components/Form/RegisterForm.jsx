/* eslint-disable jsx-a11y/img-redundant-alt */
import { LoadingOutlined } from '@ant-design/icons'
import { message } from 'antd'
import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
function RegisterForm() {
  const {registerUser} = useContext(AuthContext)

  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState({
    firstName: '',
    lastName: '',
    email:'',
    password:'',
    avatar:null
  })
  const [image,setImage] = useState(null)

  const onFormChange = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
    })
  }

  const onFileChange = (e) => {
    setUser({
      ...user,
      avatar: e.target.files[0]
    })
    setImage(URL.createObjectURL(e.target.files[0]))
  }


  const onSubmit = async (e)=>{
    setLoading(true)
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('file',user.avatar)
    formdata.append('upload_preset','my_uploads')

    const res = await fetch(`https://api.cloudinary.com/v1_1/dqiomqzug/image/upload`,{
        method: 'POST',
        body: formdata
    })
    const data = await res.json()
    const avatar = data.secure_url
    
    const registerForm ={
      avatar,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      password:user.password
    }
    const responseBackEnd = await registerUser(registerForm)
    console.log(responseBackEnd)
    if(responseBackEnd.success) setLoading(false)
    else {
      setLoading(false)
      return message.error('Đăng ký không thành công'+" "+ responseBackEnd.data.message)
    }
   
  }
  return (
    <div className="form">
    <form encType='multipart/form-data'>
      <div className="form-group">
          <input
            required={true}
            type="text" 
            name="firstName"
            placeholder='Họ'
            value={user.firstName}
            onChange={(e) => onFormChange(e)}
          />
      </div>  <div className="form-group">
          <input
            required={true}
            type="text" 
            name="lastName"
            placeholder='Tên'
            value={user.lastName}
            onChange={(e) => onFormChange(e)}
          />
      </div>
      <div className="form-group">
          <input
            required={true}
            type="text" 
            name="email"
            placeholder='Email'
            value={user.email}
            onChange={(e) => onFormChange(e)}
          />
      </div>
      <div className="form-group">
          <input
            required={true}
            type="password" 
            name="password"
            placeholder='Mật khẩu'
            value={user.password}
            onChange={(e) => onFormChange(e)}
          />
      </div>
      <div className="form-group">
        <label htmlFor="upload" className="label-upload"> Chọn ảnh đại diện</label>
          <input
            required
            id="upload"
            type="file" 
            name="avatar"
            onChange={(e) => onFileChange(e)}
            accept="image/*"
            // multiple="multiple"
          />
          {image && <img src={image} alt="image"className="image-pr"/>}
      </div>

      <button
       className="btn btn-primary register"
       onClick={(e)=>onSubmit(e)}
      > 
       {loading ? <LoadingOutlined />: ''} Đăng ký
      </button>
      <hr />
      
    </form>
    <button
    className="btn btn-primary"
   > 
     <Link to="/login">
       Đăng Nhập
     </Link>
   </button>
   </div>
  )
}

export default RegisterForm