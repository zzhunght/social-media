
import React, { Fragment, useContext, useEffect, useState} from 'react'
import { PostContext } from '../../context/post'
import { AuthContext } from '../../context/auth'
import './ListPostStyle.css'
import { LoadingOutlined } from '@ant-design/icons';
import Post from '../Post/Post';
import { useInView } from 'react-intersection-observer';

function ListPost() {
    const {inView ,ref} = useInView()

    // thông báo khi không  còn bài đăng nào
    const [message,setMessage] = useState('')

    const {authState:{user}} = useContext(AuthContext)
    const {postState:{posts,postLoading},getPost} = useContext(PostContext)
    
    useEffect(()=>{
        if(inView){
            const fetchPost = async()=>{
            const res = await getPost()
                if(res?.message) return setMessage(res.message)
            }
            fetchPost()
        }
    },[inView])
   
    return (
    <div className="post-wr">
        <div className="post-list">
            {user && posts && posts.length > 0 && posts.map((post,i) =>(
                <Fragment key={i}>
                    <Post post={post} />
                </Fragment>
            ))}
            
            {postLoading && (
                <div className="loading-post loading-post-home">
                    <LoadingOutlined className="loading-icon" />
                </div>
            )}
            <div className="message">
                {message}
            </div>
            <div ref={ref}>
            </div>
            
        </div>
    </div>
  )
}

export default ListPost