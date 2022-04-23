import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {ProfileContext} from '../../context/profile'
function NavChat() {
    const {profileState:{myprofile}} = useContext(ProfileContext)

  return (
    <div className="nav-chat">
        <div className="nav-chat-title">Quick Chat</div>
        <div className="nav-chat-list-friend">
            <div className="f-wer">
            {myprofile?.friend?.accepts.map((f,i) =>(
                <Link to={`/chat/${f._id}`} className="quick-chat-f" key={i}>
                    <img src={f.avatar} alt="" />
                </Link>
            ))}
            </div>
        </div>
    </div>
  )
}

export default NavChat