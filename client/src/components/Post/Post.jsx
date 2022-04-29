/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext,useState } from 'react'
import { Col, Row } from 'antd'
import {FaRegHeart,FaHeart,FaCheckCircle} from "react-icons/fa";
import {BsChat} from 'react-icons/bs'
import {Link, useLocation } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import { PostContext } from '../../context/post';
import { AuthContext } from '../../context/auth';
import ImageShow from '../Modal/ImageShow'

function Post({post}) {
    const location = useLocation()

    const [showModal,setShowModal] = useState(false)

    // lưu path ảnh để truyền đến modal
    const [image,setImage] = useState('')
    const {likePost,removeLike} = useContext(PostContext)
    const {authState:{user}} = useContext(AuthContext)


    const showImage = (data)=>{
        setImage(data)
        setShowModal(true)
    }
    const onClickLike = async (id)=>{
        const owner = post.user._id
        const name = user.lastName
        await likePost(id,user._id,owner,name)
    }
    const onRemoveLike = async (id)=>{
        const owner = post.user._id
        const name = user.lastName

        await removeLike(id,user._id,owner,name)
    }
    return (
    <>
    <div className="post-item" >
        <div className="post-item-head">
            <div className="post-item-user-avatar">
                <img src={`${post?.user?.avatar || 'avatar.jpg'}`} alt="avatar"  />
            </div>
            <Link className="post-item-info" to={`/${post?.user?._id === user?._id ? 'my-profile':`profile/${post?.user?._id}`}`}>
                <div className="post-item-name">
                    {post?.user?.firstName} {post?.user?.lastName}
                    <span  className="check-icon"><FaCheckCircle/></span>
                </div>
                <div className="post-item-name-sub">
                    @{post?.user?.firstName}{post?.user?.lastName}
                </div>
            </Link>
        </div>
        <div className="post-item-body">
            {post?.content}
            {post.image &&
            post.image.length >0 && (
                <div className="post-item-image">
                    <div className="first-img" onClick={() => showImage(post.image[0].path)}>
                        <img src={post.image[0].path} alt="" />
                    </div>
                    <div className="sub-img">
                        <Row gutter={[4,4]}>
                            {post.image.slice(1).map((image,i)=>(
                                <Col xs={post.image.length < 4 ? post.image.length === 2 ? 24 : 12 :8} key={i}>
                                    <img src={image.path} alt="sub image" onClick={()=>showImage(image.path)}/>
                                </Col>
                            ))}
                        </Row>
                        
                    </div>
                </div>
            )}
        </div>
        <div className="time-ago">
            <ReactTimeAgo date={post.createdAt && post.createdAt} timeStyle="twitter" />
        </div>
        <div className="post-item-react">
            { post.like.some(e=> e === user._id) ? (
                <div
                className="like-icon-fill react-icon"
                onClick={()=>onRemoveLike(post._id)}
                >
                    <FaHeart className="icon-like-fill"/><span>{post.like.length}</span>
                </div>
            ):(
                <div
                className="like-icon react-icon"
                onClick={()=>onClickLike(post._id)}
            >
                <FaRegHeart className="icon"/><span>{post.like.length}</span>
            </div>
            )}
            
            <Link className="cmt-icon react-icon" to={`/post/${post._id}`} >
                <BsChat className="icon" />  <span>{post.comment.length}</span>
            </Link>
        </div>
    </div>
    {showModal && <ImageShow data={image} setShowModal={setShowModal}/>}
    </>
  )
}

export default Post