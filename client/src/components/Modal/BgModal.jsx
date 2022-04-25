import React, { useContext, useState } from 'react'
import { FileAddOutlined, LoadingOutlined} from '@ant-design/icons'
import {message} from 'antd'
import './ModalStyle.css'
import { ProfileContext } from '../../context/profile'
function BgModal({setShowModal,setLoading,loading}) {
    // cái này lưu image dùng để upload
    const [image,setImage] = useState(null)
    //cái này để show
    const [showImage,setShowImage] = useState(null)
    const {updateBg} = useContext(ProfileContext)
   
    const onImageChange = (e)=>{
        console.log(e)
        setImage(e.target.files[0])
        setShowImage(URL.createObjectURL(e.target.files[0]))
    }
 
    const onSubmit = async() => {
        setLoading(true)
        let Imagepath
        if(!image){
            setLoading(false)
            return message.error('Không có thông tin để đăng')
        }
        const formdata = new FormData()
        if(image){
                formdata.append('file',image)
                formdata.append('upload_preset','my_uploads')

                const res = await fetch(`https://api.cloudinary.com/v1_1/dqiomqzug/image/upload`,{
                    method: 'POST',
                    body: formdata
                })
                const data = await res.json()
                Imagepath = data.secure_url
        }

        const formToBackEnd = {
            background:Imagepath,
        }
       
        
        const res = await updateBg(formToBackEnd)
        setShowModal(false)
        setLoading(false)
        setImage(null)
        setShowImage(null)
        
    }
    return (
    <div className="modal">
        <div className="modal-ct md-bg">
            <div className="modal-header">
                <p className="modal-header-text">Cập nhật ảnh bìa</p>
                <button className="modal-close-btn" onClick={()=>setShowModal(false)}></button>
            </div>
            <div className="modal-body bg-md">
                <div className="modal-form md-bg-form">
                    <form>
                        <div className="form-gr">
                            <label htmlFor="image" className="label-for-post-image">
                                <FileAddOutlined /> Chọn ảnh
                            </label>
                            <input
                             value=""
                             type="file" 
                             id="image" 
                             accept="image/*"
                             onChange={e =>onImageChange(e)}
                            />
                        </div>
                    </form>
                    {showImage && (
                        <div className="show-image-choose">
                            <div className="first-img">
                                <img src={showImage} alt="" />
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
                    {loading ? <LoadingOutlined />: ''} Cập nhật
                </button>
            </div>
        </div>
    </div>
  )
}

export default BgModal