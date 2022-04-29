import axios from 'axios'
import React, { useContext } from 'react'
import { FaCheckCircle, FaUserPlus, FaUserTimes } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import {ProfileContext} from '../../../context/profile'
import { ApiUrl } from '../../../utils/contants'
import './Notification.css'
function Notification() {

    const { data} = useQuery('notice',async ()=>{
        const res = await axios.get(`${ApiUrl}/post/notification`)
        return res.data
        
    //   },{
    //     refetchInterval:1000
    //   
    })
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
        <div className="all-post-notification">
            <p className="all-post-notification-label">Chung</p>
            {
                data?.notification && data?.notification.length >0 ?(
                    <>
                        {data?.notification.map((n,i) =>(
                            <Link to={`/post/${n.post}`} key={i} className="notice">
                                <div className="notice-message">
                                    {n.notice}
                                </div>
                            </Link>
                        ))}
                    </>
                ):(
                    <p className="no-notification">
                        Bạn không có thông báo nào
                    </p>
                )
            }
        </div>
    </div>
  )
}

export default Notification