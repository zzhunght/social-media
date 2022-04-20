import { Col, Row } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { FaCheckCircle, FaComment, FaHeart, FaRegHeart } from 'react-icons/fa'
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import {IoMdSend} from 'react-icons/io'
import { useParams,useSearchParams,useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth'
import { PostContext } from '../../../context/post'
import './PostDetailStyle.css'
import Comment from '../../Comment/Comment'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'



function PostDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const {authState:{user}} = useContext(AuthContext) 
    const {postState:{postLoading,post},getOnePost,likePost,removeLike,cmt} = useContext(PostContext)

    const [input,setInput] = useState('')

    const onChange = e =>{
        setInput(e.target.value)
    }

    const submitCmt = async () =>{
        const form ={
            id:params.id, // id của post
            user:user._id,
            text:input
        }
        await cmt(form)
    }
    const onClickLike = async (id,pageIndex)=>{
        await likePost(id,user._id,pageIndex)
    }
    const onRemoveLike = async (id,pageIndex)=>{
        await removeLike(id,user._id,pageIndex)
    }

    useEffect(() => {
        const fetchPost = async ()=>{
            await getOnePost(params.id)
        }
        fetchPost()
    },[params.id])

    return (
    <div className="post-details-wr">
        <div className="post-details-head">
            <div className="back-arrow" onClick={()=>navigate(-1)}>
                <div className="back-arrow-icon"><MdOutlineKeyboardBackspace /></div>
            </div>
            <div className="post-details-head-title">
                Post
            </div>
        </div>
        <div className="post-detail-body">
            {post && (<>
                <div className="post-item" >
                    <div className="post-item-head">
                        <div className="post-item-user-avatar">
                            <img src={`${post.user && post.user.avatar? post.user.avatar : 'avatar.jpg'}`} alt="avatar"  />
                        </div>
                        <div className="post-item-info">
                            <div className="post-item-name">
                                {post.user && post.user.firstName? post.user.firstName : ''} {post.user && post.user.lastName? post.user.lastName : ''}
                                <span  className="check-icon"><FaCheckCircle/></span>
                            </div>
                            <div className="post-item-name-sub">
                                @{post.user && post.user.firstName? post.user.firstName : ''}{post.user && post.user.lastName? post.user.lastName : ''}
                            </div>
                        </div>
                    </div>
                    <div className="post-item-body">
                        {post.content ? post.content : ''}
                        {post.image &&
                            post.image.length >0 && (
                            <div className="post-item-image">
                                <div className="first-img">
                                    <img src={post.image[0].path} alt="" />
                                </div>
                                <div className="sub-img">
                                    <Row gutter={[4,4]}>
                                        {post.image.slice(1).map((image,i)=>(
                                            <Col xs={post.image.length < 4 ? post.image.length === 2 ? 24 : 12 :8} key={i}>
                                                <img src={image.path} alt="sub image"/>
                                            </Col>
                                        ))}
                                    </Row>
                                    
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="time-ago">
                        <ReactTimeAgo date={post.createdAt && post.createdAt} />
                    </div>
                    <div className="post-item-react">
                        { post.like.some(e=> e === user._id) ? (
                            <div
                                className="like-icon react-icon"
                                onClick={()=>onRemoveLike(post._id)}
                            >
                                <FaHeart className="icon"/><span>{post.like.length}</span>
                            </div>
                        ):(
                            <div
                                className="like-icon react-icon"
                                onClick={()=>onClickLike(post._id)}
                            >
                                <FaRegHeart className="icon"/><span>{post.like.length}</span>
                            </div>
                        )}
                        
                        <div className="cmt-icon react-icon">
                            <FaComment className="icon" />  <span>{post.comment.length}</span>
                        </div>
                    </div>
                    <div className="cmt-input-wr">
                        <div className="cmt-user-ava">
                            <img src={`${user && user.avatar? user.avatar : 'avatar.jpg'}`} alt="avatar"  />
                        </div>
                        <div className="cmt-input">
                            <input type="text" value={input} onChange={(e)=>onChange(e)}/>
                            <button className="send-btn" onClick={()=>submitCmt()}><IoMdSend /></button>
                        </div>
                    </div>
                    <div className="post-detail-comment">
                        <div className="comment-list">
                            {post.comment && post.comment.length >0 &&
                                post.comment.map((c,i)=>(
                                    <Comment data={c} key={i} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </>)}
            {postLoading && (
                <div className="loading-post">
                    <LoadingOutlined className="loading-icon" />
                </div>
            )}
             
        </div>
        
    </div>
  )
}

export default PostDetails