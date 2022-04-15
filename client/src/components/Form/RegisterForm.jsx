/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
function RegisterForm() {
  const {registerUser} = useContext(AuthContext)
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
  const onSubmit = (e)=>{
    e.preventDefault()
    const form = new FormData()
    form.append('photo',user.avatar)
    form.append('firstName',user.firstName)
    form.append('lastName',user.lastName)
    form.append('email',user.email)
    form.append('password',user.password)
    registerUser(form)
    
   
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
        Đăng ký
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