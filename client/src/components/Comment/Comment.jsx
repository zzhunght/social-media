import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import './CommentStyle.css'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
function Comment({data}) {
    console.log('data',data)
  return (
    <div className="cmt-wr">
        <div className="cmt-user-ava">
            <img src={`${data.user && data.user.avatar? data.user.avatar : 'avatar.jpg'}`} alt="avatar"  />
        </div>
        <div>
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
        </div>
    </div>
  ) 
}

export default Comment