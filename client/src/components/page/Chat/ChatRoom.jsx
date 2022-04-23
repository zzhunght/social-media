import axios from 'axios'
import React, { useContext } from 'react'
import {useQuery} from 'react-query'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/auth'
import setAuthToken, { accessToken, ApiUrl } from '../../../utils/contants'
import NavChat from '../../Nav/NavChat'
import './ChatRoom.css'
function ChatRoom() {
  const {authState:{user,isAuthenticated}} = useContext(AuthContext)
  const { data, error, isFetching } = useQuery('cvs',async ()=>{
    if(isAuthenticated){
      setAuthToken(localStorage.getItem(accessToken))
      const res = await axios.get(`${ApiUrl}/conversation`)
      return res.data
    }
  },{
    refetchInterval:1000
  })
  return (
    <div className="chat-room-wr">
        <div className="chat-room-title">
            <h2>Chats</h2>
        </div>
        <NavChat />
        <div className="conversations">
            <h2 className="conversations-title">
                Messages
            </h2>
            <div className="conversations-list">
              {data?.conversations?.length > 0 ? (
                <>
                  {data.conversations.map((c,i)=>(
                    <div key={i}>
                      {c?.members.map((c,index)=>{
                        if(c._id !== user._id) return(
                          (
                            <Link className="conversation-item" key={index} to={`/chat/${c._id}`}>
                              <div className="conversation-items-ava">
                                <img src={c.avatar} alt="" />
                              </div>
                              <div className="conversation-item-name">
                                {c.firstName} {c.lastName}
                              </div>
                            </Link>
                          )
                        )
                      })}
                    </div>
                  ))}
                </>
              ):(
                <div className="empty-conversation">
                    Bạn Không có cuộc trò chuyện nào
                </div>
              )}
            </div>
        </div>
    </div>
  )
}

export default ChatRoom