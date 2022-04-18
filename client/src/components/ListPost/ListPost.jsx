import { Col, Row } from 'antd'
import {FaRegHeart,FaHeart, FaComment ,FaCheckCircle} from "react-icons/fa";
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PostContext } from '../../context/post'
import { AuthContext } from '../../context/auth'
import './ListPostStyle.css'

function ListPost() {
    const {authState:{user}} = useContext(AuthContext)
    const {postState:{posts,postLoading},likePost,removeLike} = useContext(PostContext)
    

    const onClickLike = async (id,pageIndex)=>{
        await likePost(id,user._id,pageIndex)
    }
    const onRemoveLike = async (id,pageIndex)=>{
        await removeLike(id,user._id,pageIndex)
    }
   
    return (
    <div className="post-wr">
        <div className="post-list">
            {user && posts && posts.length > 0 && posts.map((page,pageIndex) =>(
                <Fragment key={pageIndex}>
                {page && page.page.length > 0 &&
                    page.page.map((post,i)=>(
                        <div className="post-item" key={i}>
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
                            <div className="post-item-react">
                                { post.like.some(e=> e === user._id) ? (
                                    <div
                                     className="like-icon react-icon"
                                     onClick={()=>onRemoveLike(post._id,pageIndex)}
                                    >
                                        <FaHeart className="icon"/><span>{post.like.length}</span>
                                    </div>
                                ):(
                                    <div
                                     className="like-icon react-icon"
                                     onClick={()=>onClickLike(post._id,pageIndex)}
                                   >
                                       <FaRegHeart className="icon"/><span>{post.like.length}</span>
                                   </div>
                                )}
                                
                                <div className="cmt-icon react-icon">
                                    <FaComment className="icon" />  <span>{post.comment.length}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </Fragment>
            ))}
        </div>
    </div>
  )
}

export default ListPost