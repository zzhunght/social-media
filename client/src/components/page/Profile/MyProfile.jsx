import { LoadingOutlined } from '@ant-design/icons'
import React, { useContext, useEffect, useState } from 'react'
import {VscListFlat} from 'react-icons/vsc'
import { BsFilePlus} from 'react-icons/bs'
import { FaCheckCircle } from 'react-icons/fa'
import { ProfileContext } from '../../../context/profile'
import BgModal from '../../Modal/BgModal'
import Post from '../../Post/Post'
import './Profile.css'
import Menu from '../../Menu/Menu'
function MyProfile() {
    const {profileState:{myprofile,myprofileLoading},getMyProfile} = useContext(ProfileContext)

    const [loading,setLoading] = useState(false)
    const [showModal,setShowModal] = useState(false)
    
    const showMenu = () =>{
        const menu = document.querySelector('.menu-wr')
        menu.style.transform = 'translateX(0)'
    }
    const hideMenu = () =>{
        const menu = document.querySelector('.menu-wr')
        menu.style.transform = 'translateX(-101%)'
    }
    useEffect(() => {
        getMyProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        <div onClick={() =>setShowModal(true)} > {loading ? <LoadingOutlined />:
                        <>
                            Cập nhật ảnh bìa của bạn <BsFilePlus />
                        </>
                        }
                        </div>
                        <div className="menu-open" onClick={() =>showMenu()} >
                            <VscListFlat />
                        </div>
                        
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
        {showModal && <BgModal setShowModal={setShowModal} setLoading={setLoading} loading={loading}/>}
        <Menu hideMenu={hideMenu}/>
    </div>
  )
}

export default MyProfile