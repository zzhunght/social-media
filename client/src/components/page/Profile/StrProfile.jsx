import { LoadingOutlined } from '@ant-design/icons'
import React, { useContext, useEffect} from 'react'
import { FaCheckCircle, FaUserCheck, FaUserPlus, FaUserTimes } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/auth'
import { ProfileContext } from '../../../context/profile'
import Post from '../../Post/Post'
import './Profile.css'
function StrProfile() {
    const param = useParams()
    const {authState:{user}} = useContext(AuthContext)
    const {profileState:{myprofile,strprofile,strprofileLoading},getStrProfile,addFriend,cancelAddFriend} = useContext(ProfileContext)
    const onAddFriend = async ()=>{
        await addFriend(user._id,strprofile.user._id)
    }
    const onCancelAdd = async ()=>{
        await cancelAddFriend(user._id,strprofile.user._id)
    }
    useEffect(() => {
        getStrProfile(param.id)
    },[param.id])
  return (
    <div className="profile-wr">
        {strprofileLoading && (
            <div className="loading-post">
                <LoadingOutlined className="loading-icon" />
            </div>
        )}
        {strprofile && !strprofileLoading && (
            <div className="profile">
                <div className="pr-bg"  style={{backgroundImage:`url(${strprofile?.user?.background})`}}>   
                   
                </div>
                <div className="pr-info">
                    <div className="pr-info-head">
                        <div className="pr-ava">
                            <img src={strprofile?.user?.avatar} alt="ava" />
                        </div>
                        <div className="pr-info-head-right">
                            <div className="count">{strprofile?.posts?.length || 0} <span className="count-label">Posts</span></div>
                            <div className="count">{strprofile?.friend?.accepts.length || 0} <span className="count-label">Friend</span></div>
                            <div className="count">{strprofile?.friend?.pendings.length || 0}<span className="count-label">Following</span></div>
                        </div>
                    </div>
                    <div className="pr-info-f-o">
                        <div className="pr-name">
                            <div className="name">
                                {strprofile?.user?.firstName} {strprofile?.user?.lastName}
                                <span  className="check-icon"><FaCheckCircle/></span>
                            </div>
                            <div className="name-sub">
                                @{strprofile?.user?.firstName}{strprofile?.user?.lastName}
                            </div>
                        </div>
                        <div className="f-option">
                            {myprofile?.friend?.accepts.some(f => f === strprofile._id) ?
                                (
                                    <div className="add-friend">
                                        Bạn bè <FaUserCheck className="f-o-icon" />
                                    </div>
                                ): myprofile?.friend?.pendings.some(f => f === strprofile.user._id) ? (
                                    <div className="add-friend remove-friend" onClick={() =>onCancelAdd()}>
                                        Huỷ lời mời <FaUserTimes className="f-o-icon" />
                                    </div>
                                ):(
                                    <div className="add-friend" onClick={() =>onAddFriend()}>
                                        Thêm bạn <FaUserPlus className="f-o-icon" />
                                    </div>
                                )
                            }
                            
                           
                        </div>
                    </div>
                </div>
                <div className="pr-post">
                    {strprofile?.posts?.map((post,i) => (
                        <Post post={post} key={i} />
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default StrProfile