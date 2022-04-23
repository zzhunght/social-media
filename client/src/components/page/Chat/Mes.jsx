import React, { useContext, useEffect, useState } from 'react'
import { IoSend } from 'react-icons/io5'
import ReactTimeAgo from 'react-time-ago'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/auth'
import { SocketContext } from '../../../context/socketIo'
import { MesContext } from '../../../context/mes'
import {ProfileContext} from '../../../context/profile'
import { LoadingOutlined } from '@ant-design/icons'
function Mes() {
    const [textarea,setTextarea] = useState('')


    const navigate = useNavigate()
    const param = useParams()
    const id2 = param.id

    const {profileState:{myprofile},getStrProfile} = useContext(ProfileContext)
    const {authState:{user}} = useContext(AuthContext)
    const {SendMsgSocket} = useContext(SocketContext)
    const {mesState:{mes,chatWith,mesLoading,conversationId},getMes,SaveMsgDB} = useContext(MesContext)

    const onTextChange = (e) =>{
        setTextarea(e.target.value)
    }

    const sendMessage = () =>{
        console.log('sendMessage')
        const data = {
            sender:user._id,
            conversation_id:conversationId,
            text:textarea,
        }   
        SendMsgSocket(data)
        SaveMsgDB(data)
        setTextarea('')
       
    }
    
    useEffect(() => {
        getMes(id2)
        getStrProfile(id2)
    },[id2,myprofile])
    

    
    
    
    return (
    <div className="mes">
        <div className="nav-mes">
            <div className="nav-mes-arrow" onClick={()=>navigate(-1)}>
                <MdArrowBackIosNew />
            </div>
            <div className="nav-mes-name">
                {chatWith?.firstName} {chatWith?.lastName}
            </div>
        </div>
        <div className="mes-body">
            {mes?.map((m,i)=>(
                <div className={`mes-text ${m.sender === user?._id ?'m-mes-text' : ''}`} key={i}>
                    <div className="mes-text-ct">
                        <p>{m.text}</p>
                        
                        {m?.createdAt && (
                            <div className="time-ago">
                                <ReactTimeAgo date={m.createdAt && m?.createdAt || Date.now()} timeStyle="twitter"/>
                            </div>
                        )}
                      
                    </div>
                    
                    
                </div>
            ))}
            {mesLoading && 
                <div className="loading-post">
                    <LoadingOutlined className="loading-icon" />
                </div>
            }
        </div>
        <div className="mes-input">
            <textarea
             className="mes-input-textarea"
             onChange={(e)=>onTextChange(e)}
             value={textarea}
            ></textarea>
            <button
             className={`icon-sends ${textarea.length >0 ? '':'disabled'}`}
             disabled={textarea.length > 0 ?false:true}
             onClick={()=>sendMessage()}
            >
                <IoSend />
            </button>
        </div>
    </div>
  )
}

export default Mes