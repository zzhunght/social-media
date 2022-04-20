
import React, { Fragment, useContext, useEffect, useState} from 'react'
import { PostContext } from '../../context/post'
import { AuthContext } from '../../context/auth'
import './ListPostStyle.css'
import { LoadingOutlined } from '@ant-design/icons';
import Post from '../Post/Post';


function ListPost() {
    const [page,setPage] = useState(1)

    const {authState:{user}} = useContext(AuthContext)
    const {postState:{posts,postLoading},getPost} = useContext(PostContext)
    

   
    useEffect(()=>{
        const fetchPost = async()=>{
          console.log('fetch post')
          await getPost(page)
        }
        fetchPost()
      },[])
    return (
    <div className="post-wr">
        <div className="post-list">
            {user && posts && posts.length > 0 && posts.map((post,i) =>(
                <Fragment key={i}>
                    <Post post={post} />
                </Fragment>
            ))}
            {postLoading && (
                <div className="loading-post">
                    <LoadingOutlined className="loading-icon" />
                </div>
            )}
        </div>
    </div>
  )
}

export default ListPost