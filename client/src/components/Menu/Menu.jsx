import { message } from 'antd'
import React, { useContext, useState } from 'react'
import {LoadingOutlined} from '@ant-design/icons'
import {BsCardImage} from 'react-icons/bs'
import {MdOutlineDriveFileRenameOutline} from 'react-icons/md'
import {AiOutlineLogout,AiOutlineSetting} from 'react-icons/ai'
import {BiArrowBack} from 'react-icons/bi'
import { AuthContext } from '../../context/auth'
import './Menu.css'
import { ProfileContext } from '../../context/profile'

function Menu({hideMenu}) {
    const {authState:{user},updateAvatar,updateName,updatePassword,LogOut} = useContext(AuthContext)
    const {getMyProfile} = useContext(ProfileContext)

    const [showItem1,setShowItem1] = useState(false)
    const [showItem2,setShowItem2] = useState(false)
    const [showItem3,setShowItem3] = useState(false)

    const [loading,setLoading] = useState(false)
    const [ava,setAva] = useState(null)
    const [showAva,setShowAva] = useState(null)
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [password,setPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [reNewPassword,setReNewPassword] = useState('')


    const onFirstNameChange = e =>{
        setFirstName(e.target.value)
    }
    const onLastNameChange = e =>{
        setLastName(e.target.value)
    }
    const onPasswordChange = e =>{
        setPassword(e.target.value)
    }
    const onNewPasswordChange = e =>{
        setNewPassword(e.target.value)
    }
    const onReNewPasswordChange = e =>{
        setReNewPassword(e.target.value)
    }
    const onAvaChange = e =>{
        setAva(e.target.files[0])
        setShowAva(URL.createObjectURL(e.target.files[0]))
    }
    const submitName = async()=>{
        if(!firstName || !lastName ) return message.error('Chưa điền đầy đủ thông tin')
        setLoading(true)
        const form = {
            firstName: firstName,
            lastName: lastName
        }
        const res = await updateName(form)
        if(res.success){
            message.success({
                content: 'Cập nhật thành công',
                className: 'success-class',
                style:{
                    color:'rgb(101 165 105) !important'
                },
            })
            setFirstName('')
            setLastName('')
            setLoading(false)
            getMyProfile()
        }
        else{
            console.log(res)
            message.error({
                content: res.message,
            })
            setFirstName('')
            setLastName('')
            setLoading(false)

        }
    }
    
    const updateAva = async ()=>{
        if(!ava) return message.error('Vui lòng chọn ảnh')
        else{
            setLoading(true)
            let Imagepath
            const formdata = new FormData()
            formdata.append('file',ava)
            formdata.append('upload_preset','my_uploads')

            const uploadImage = await fetch(`https://api.cloudinary.com/v1_1/dqiomqzug/image/upload`,{
                method: 'POST',
                body: formdata
            })
            const data = await uploadImage.json()
            Imagepath = data.secure_url
            const res = await updateAvatar({
                avatar:Imagepath
            })
            if(res.success){
                message.success({
                    content: 'Cập nhật thành công',
                    className: 'success-class',
                    style:{
                        color:'rgb(101 165 105) !important'
                    },
                })
                
                setAva(null)
                setShowAva(null)
                setLoading(false)
                getMyProfile()
            }
            else{
                console.log(res)
                message.error({
                    content: res.message,
                })
                
                setAva(null)
                setShowAva(null)
                setLoading(false)
            }
            
        }
    }
    const submitUpdatePassword = async ()=>{
        if(!newPassword || !password || !reNewPassword) return message.error({
            content: 'Bạn chưa điền đầy đủ thông tin',
            className: 'custom-class',
        });
        else if(newPassword !== reNewPassword) return message.error({
            content: 'Mật khẩu nhập vào không khớp nhau',
            className: 'custom-class',
        });
        else{
            setLoading(true)
            const form = {
                password: password,
                newPassword: newPassword
            }
            const res = await updatePassword(form)
            if(res.success){
                message.success({
                    content: 'Cập nhật mật khẩu thành công',
                    className: 'success-class',
                    style:{
                        color:'rgb(101 165 105) !important'
                    },
                })
                setPassword('')
                setNewPassword('')
                setReNewPassword('')
                setLoading(false)
            }
            else{
                console.log(res)
                message.error({
                    content: res.message,
                })
                setPassword('')
                setNewPassword('')
                setReNewPassword('')
                setLoading(false)
            }
        }
    }
    return (
    <div className="menu-wr">
        <div className="menu-back-icon" >
            <BiArrowBack onClick={hideMenu}/>
        </div>
        <div className="menu-list">
            <div className="menu-item">
                <p className="menu-item-label" onClick={() =>setShowItem1(!showItem1)}>
                    <MdOutlineDriveFileRenameOutline className="menu-item-icon"/> Đổi tên
                </p>
                {showItem1 && (
                    <div className="update-form">
                        <div className="form-group">
                            <input
                                required={true}
                                type="text" 
                                name="firstName"
                                placeholder={user?.firstName}
                                value={firstName}
                                onChange={e =>onFirstNameChange(e)}
                            />
                        </div>  
                        <div className="form-group">
                            <input
                                required={true}
                                type="text" 
                                name="lastName"
                                placeholder={user?.lastName}
                                value={lastName}
                                onChange={e =>onLastNameChange(e)}
                            />
                        </div>
                        <button                     
                            className={`btn update-btn ${loading ? 'loading-btn' : ''}`}
                            onClick={submitName}
                        >
                            {loading ? <LoadingOutlined />:''} Cập nhật</button>
                    </div>
                )}
            </div>
            <div className="menu-item">
                <p className="menu-item-label" onClick={() =>setShowItem2(!showItem2)}><BsCardImage className="menu-item-icon"/> Cập nhật ảnh đại diện</p>
                {showItem2 && (
                    <div className="update-form">
                        <label htmlFor="update-ava" className="label-update-ava" style={{backgroundImage:`url(${showAva? showAva: ''})`}}>Chọn ảnh</label>
                        <input
                        type="file" 
                        id="update-ava" 
                        onChange={e =>onAvaChange(e)}
                        />
                        <button 
                         className={`btn update-btn ${loading ? 'loading-btn' : ''}`}
                         onClick={updateAva}
                        >
                            {loading ? <LoadingOutlined />:''} Cập nhật</button>
                    </div>
                )}
            </div>
            <div className="menu-item">
                <p className="menu-item-label" onClick={() =>setShowItem3(!showItem3)}><AiOutlineSetting className="menu-item-icon"/> Đổi mật khẩu</p>
                {showItem3 && (
                    <div className="update-form">
                        <div className="form-group">
                            <input
                                required={true}
                                type="password" 
                                name="password"
                                placeholder='Mật khẩu'
                                value={password}
                                onChange={e =>onPasswordChange(e)}
                            />
                        </div>  
                        <div className="form-group">
                            <input
                                required={true}
                                type="password" 
                                name="lastName"
                                placeholder='Mật khẩu mới'
                                value={newPassword}
                                onChange={e =>onNewPasswordChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                required={true}
                                type="password" 
                                name="lastName"
                                placeholder='Nhập lại mật khẩu mới'
                                value={reNewPassword}
                                onChange={e =>onReNewPasswordChange(e)}
                            />
                        </div>
                        <button
                        className={`btn update-btn ${loading ? 'loading-btn' : ''}`}
                        onClick={submitUpdatePassword}
                        disabled={loading}
                        >
                            {loading ? <LoadingOutlined />:''} Cập nhật</button>
                    </div>
                )}
            </div>
            <div className="menu-item">
                <p className="menu-item-label log-out" onClick={LogOut}>
                    <AiOutlineLogout className="menu-item-icon"/> Đăng Xuất
                </p>
            </div>
        </div>
    </div>
  )
}

export default Menu