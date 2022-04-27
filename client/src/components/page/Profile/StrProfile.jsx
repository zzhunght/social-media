import { LoadingOutlined } from '@ant-design/icons'
import React, { useContext, useEffect} from 'react'
import { BsFillChatFill } from 'react-icons/bs'
import { FaCheckCircle, FaUserCheck, FaUserPlus, FaUserTimes } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/auth'
import { ProfileContext } from '../../../context/profile'
import Post from '../../Post/Post'
import './Profile.css'
function StrProfile() {
    const param = useParams()
    const {authState:{isAuthenticated}} = useContext(AuthContext)
    const {
        profileState:{myprofile,strprofile,strprofileLoading},
        getStrProfile,
        addFriend,
        cancelAddFriend,
        acceptFriend,
        rejectFriend,
    }  = useContext(ProfileContext)

    //thêm bạn
    const onAddFriend = async ()=>{
        await addFriend(strprofile.user._id)
    }
    //huỷ lời mời
    const onCancelAdd = async ()=>{
        await cancelAddFriend(strprofile.user._id)
    }
    //chấp nhận
    const onAcceptFriend = async ()=>{
        await acceptFriend(strprofile.user._id)
    }
    // từ chối
    const onRejectFriend = async ()=>{
        await rejectFriend(strprofile.user._id)
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
                    <Link className="chat-now" to={`/chat/${strprofile?.user._id}`}>
                        <BsFillChatFill />
                    </Link>
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
                            {   myprofile?.friend?.accepts.some(f => f._id === strprofile?.user._id) ?
                                (
                                    <div className="add-friend">
                                        Bạn bè <FaUserCheck className="f-o-icon" />
                                    </div>
                                )
                                : 
                                myprofile?.friend?.pendings.some(f => f._id === strprofile?.user._id) ? 
                                (
                                    <div className="add-friend remove-friend" onClick={() =>onCancelAdd()}>
                                        Huỷ lời mời <FaUserTimes className="f-o-icon" />
                                    </div>
                                ):  
                                myprofile?.friend?.requests.some(f => f._id === strprofile?.user._id) ? 
                                (
                                    <>
                                    <div className="add-friend accept" onClick={() =>onAcceptFriend()}>
                                        Chấp nhận <FaUserPlus className="f-o-icon" />
                                    </div>
                                    <div className="add-friend reject" onClick={() =>onRejectFriend()}>
                                        Từ chối <FaUserTimes className="f-o-icon" />
                                    </div>
                                    </>
                                ):
                                (
                                    <div className="add-friend" onClick={() =>onAddFriend()}>
                                        Thêm bạn <FaUserPlus className="f-o-icon" />
                                    </div>
                                )
                            }
                            
                            <div className="pr-bio">
                                <p>{strprofile?.user?.bio}</p>
                            </div>
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