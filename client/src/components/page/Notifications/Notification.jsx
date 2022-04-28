import React, { useContext } from 'react'
import { FaCheckCircle, FaUserPlus, FaUserTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {ProfileContext} from '../../../context/profile'
import './Notification.css'
function Notification() {
    const {profileState:{myprofile:{friend}},acceptFriend,rejectFriend} = useContext(ProfileContext)
    const onAcceptFriend = async (id)=>{
        await acceptFriend(id)
    }
    // từ chối
    const onRejectFriend = async (id)=>{
        await rejectFriend(id)
    }
    return (
    <div
        className="notification-wr"
    >
        <h2>Thông báo</h2>

        <div className="fr-requests">
            <p className="fr-requests-label">Lời mời kết bạn</p>
            {friend && friend.requests.length >0 ? (
                <div className="fr-requests-l">
                    {friend.requests.map((u,i)=>(
                        <div className="fr-requests-i" key={i}>
                            <div className="search-item-user" key={i}>
                                <div className="search-item-user-avatar">
                                    <img src={`${u?.avatar || 'avatar.jpg'}`} alt="avatar"  />
                                </div>
                                <Link className="search-item-user-info" to={`/profile/${u?._id}`}>
                                    <div className="search-item-user-name">
                                        {u?.firstName} {u?.lastName}
                                        <span  className="check-icon"><FaCheckCircle/></span>
                                    </div>
                                    <div className="search-item-user-sub-name">
                                        @{u?.firstName}{u?.lastName}
                                    </div>
                                </Link>
                                {u?.bio && (
                                    <div className="search-user-bio">
                                    {u.bio}
                                    </div>
                                )}
                            </div>
                            <div className="fr-requests-options">
                                <div className="add-friend accept" onClick={() =>onAcceptFriend(u._id)}>
                                    Chấp nhận <FaUserPlus className="f-o-icon" />
                                </div>
                                <div className="add-friend reject" onClick={() =>onRejectFriend(u._id)}>
                                    Từ chối <FaUserTimes className="f-o-icon" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ):(
                <p className="no-requests-friend">
                    Bạn không có lời mời kết bạn nào
                </p>
            )}
        </div>
    </div>
  )
}

export default Notification