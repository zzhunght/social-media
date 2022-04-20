import { LoadingOutlined } from '@ant-design/icons'
import React, { useContext, useEffect, useState } from 'react'
import { BsFilePlus } from 'react-icons/bs'
import { FaCheckCircle } from 'react-icons/fa'
import { ProfileContext } from '../../../context/profile'
import Post from '../../Post/Post'
import './Profile.css'
function MyProfile() {
    const {profileState:{myprofile,myprofileLoading},getMyProfile} = useContext(ProfileContext)

    const [bg,setBg] = useState(null)
    const onImageChange = (e)=>{
        setBg(e.target.file)
    }

    useEffect(() => {
        getMyProfile()
    },[])
  return (
    <div className="profile-wr">
        {myprofileLoading && (
            <div className="loading-post">
                <LoadingOutlined className="loading-icon" />
            </div>
        )}
        {myprofile && (
            <div className="profile">
                <div className="pr-bg"  style={{backgroundImage:`url(${myprofile?.user?.background})`}}>
                    <div className="upload-bg">
                        <label htmlFor="bg"> Cập nhật ảnh bìa của bạn <BsFilePlus /></label>
                        <input type="file" id="bg"/>
                    </div>
                </div>
                <div className="pr-info">
                    <div className="pr-info-head">
                        <div className="pr-ava">
                            <img src={myprofile?.user?.avatar} alt="ava" />
                        </div>
                        <div className="pr-info-head-right">
                            <div className="count">{myprofile?.posts?.length || 0} <span className="count-label">Posts</span></div>
                            <div className="count">{myprofile?.friend?.accepts.length || 0} <span className="count-label">Friend</span></div>
                            <div className="count">{myprofile?.friend?.pendings.length || 0}<span className="count-label">Following</span></div>
                        </div>
                    </div>
                    <div className="pr-name">
                        <div className="name">
                            {myprofile?.user?.firstName} {myprofile?.user?.lastName}
                            <span  className="check-icon"><FaCheckCircle/></span>
                        </div>
                        <div className="name-sub">
                            @{myprofile?.user?.firstName}{myprofile?.user?.lastName}
                        </div>
                    </div>
                </div>
                <div className="pr-post">
                    {myprofile?.posts?.map((post,i) => (
                        <Post post={post} key={i}/>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default MyProfile