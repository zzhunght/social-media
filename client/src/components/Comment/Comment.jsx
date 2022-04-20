import React, { useContext } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'
import './CommentStyle.css'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import { AuthContext } from '../../context/auth'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
function Comment({data}) {
    const {authState:{user}} = useContext(AuthContext)
  return (
    <div className="cmt-wr">
        <div className="cmt-user-ava">
            <img src={`${data.user && data.user.avatar? data.user.avatar : 'avatar.jpg'}`} alt="avatar"  />
        </div>
        <div className="c">
            <div className="cmt-body">
                <div className="cmt-user-name">{data.user && data.user.firstName} {data.user && data.user.lastName}
                    <span  className="check-icon"><FaCheckCircle/></span>
                    
                </div>
                
                <div className="cmt-text">
                    {data.text && data.text}
                </div>
                
            </div>
            <div className="time-ago">
                    <ReactTimeAgo date={data.createdAt && data.createdAt} />
            </div>
            {data.user && user && data.user._id === user._id ? (
                <div className="c-option">
                    <div className="3dot-icon"><BsThreeDots /></div>
                </div>
            ):''}
        </div>
        
    </div>
  ) 
}

export default Comment