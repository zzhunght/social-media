import React, { useContext, useState } from 'react'
import { FileAddOutlined, LoadingOutlined} from '@ant-design/icons'
import { Row , Col ,message} from 'antd'
import { AuthContext } from '../../context/auth'
import { BaseUrl } from '../../utils/contants'
import './ModalStyle.css'
import axios from 'axios'
import { PostContext } from '../../context/post'
function ModalPost({setShowModal}) {
    const [loading,setLoading] = useState(false)
    const [status,setStatus] = useState('public')
    const [content,setContent] = useState('')
    // cái này lưu image dùng để upload
    const [image,setImage] = useState(null)
    //cái này để show
    const [showImage,setShowImage] = useState(null)
    const {authState:{user}} = useContext(AuthContext)
    const {postPost} = useContext(PostContext)
   
    const onImageChange = (e)=>{
        const listImage = []
        const listsUrlImage = []
        for(let i= 0;i<e.target.files.length;i++){
            listImage.push(e.target.files[i])
            listsUrlImage.push(URL.createObjectURL(e.target.files[i]))
        }   
        setImage(listImage)
        setShowImage(listsUrlImage)
    }
    const onTextChange = (e) => {
        setContent(e.target.value)
        
    }
    const onStatusChange = (e) => {
        setStatus(e.target.value)
        
    }
    const onSubmit = async() => {
        setLoading(true)
        const Imagepath = []
        if(!content && !image){
            setLoading(false)
            return message.error('Không có thông tin để đăng')
        }
        const formdata = new FormData()
        if(image){
            for(let i=0;i<image.length;i++) {
                formdata.append('file',image[i])
                formdata.append('upload_preset','my_uploads')

                const res = await fetch(`https://api.cloudinary.com/v1_1/dqiomqzug/image/upload`,{
                    method: 'POST',
                    body: formdata
                })
                const data = await res.json()
                Imagepath.push({
                    path:data.secure_url
                })
            }
        }
        
        const formToBackEnd = {
            image:Imagepath,
            user:user._id,
            content:content,
            status:status
        }
       
        console.log('upload success')
        console.log('Imagepath',Imagepath)
        const res = await postPost(formToBackEnd)
        console.log('res',res)
        message.success('Tin của bạn đã được đăng !!!')
        setShowModal(false)
        setLoading(false)
        setContent('')
        setImage(null)
        setShowImage(null)
        
    }
    return (
    <div className="modal">
        <div className="modal-ct">
            <div className="modal-header">
                <p className="modal-header-text">Tạo Bài Viết</p>
                <button className="modal-close-btn" onClick={()=>setShowModal(false)}></button>
            </div>
            <div className="modal-body">
                <div className="moda-body-head">
                    <div className="moda-body-head-avata">
                        <img src={`${user && user.avatar? user.avatar : 'avatar.jpg'}`} alt="avata" />
                    </div>
                    <div className="modal-info">
                        <div className="moda-body-head-name">
                            {user && user.firstName? user.firstName : ''} {user && user.lastName? user.lastName : ''} 
                        </div>
                        <div className="options">
                            <select name="status" id="status" value={status} onChange={e => onStatusChange(e)}>
                                <option value="public" > Công khai</option>
                                <option value="pivate">  Chỉ mình tôi</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="modal-form">
                    <form>
                        <div className="form-gr">
                            <textarea
                                className="text-area"
                                type="text" 
                                name="content"
                                placeholder={`${user && user.lastName? user.lastName : ''} ơi! Bạn đang nghĩ gì thế? `}
                                rows={6}
                                value={content}
                                onChange={e =>onTextChange(e)}
                            ></textarea>
                        </div>
                        <div className="form-gr">
                            <label htmlFor="image" className="label-for-post-image">
                                <FileAddOutlined /> Thêm ảnh
                            </label>
                            <input
                             value=""
                             type="file" 
                             id="image" 
                             accept="image/*"
                             multiple="multiple"
                             onChange={e =>onImageChange(e)}
                            />
                        </div>
                    </form>
                    {showImage && (
                        <div className="show-image-choose">
                            <div className="first-img">
                                <img src={showImage[0]} alt="" />
                            </div>
                            <div className="sub-img">
                                <Row gutter={[4,4]}>
                                    {showImage.slice(1).map((image,i)=>(
                                        <Col xs={showImage.length < 4 ? showImage.length === 2 ? 24 : 12 :8} key={i}>
                                            <img src={image} alt="sub image"/>
                                        </Col>
                                    ))}
                                </Row>
                                
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="modal-footer">
                <button
                 className={`submit-post ${loading ? 'loading': ''} `} 
                 onClick={onSubmit}
                 disable={loading ? "true" : "false"}
                >
                    {loading ? <LoadingOutlined />: ''} Đăng
                </button>
            </div>
        </div>
    </div>
  )
}

export default ModalPost