import React, { useContext, useEffect, useState } from 'react'
import {AuthContext} from '../../../context/auth'
import { PostContext } from '../../../context/post'
import { BaseUrl } from '../../../utils/contants'
import ListPost from '../../ListPost/ListPost'
import ModalPost from '../../Modal/ModalPost'
import NavHome from '../../Nav/NavHome'
import './ContentStyle.css'

function Content() {
  const [page,setPage] = useState(1)
  const {authState:{user}} = useContext(AuthContext)
  const {getPost,postState:{postLoading,posts}} = useContext(PostContext)
  const [showModal,setShowModal]= useState(false)

  useEffect(()=>{
    const fetchPost = async()=>{
      console.log('fetch post')
      await getPost(page)
    }
    fetchPost()
  },[])
  return (
    <>
    <div className="main">
      <NavHome />
      <div className="label-post-stt">
          <div className="label-post-stt-avata">
              <img src={`${user && user.avatar? user.avatar : 'avatar.jpg'}`} alt="avata" />
          </div>
          <div className="label-post-stt-title" onClick={() =>setShowModal(true)}>
              {user && user.lastName? user.lastName : ''} ơi! Bạn đang nghĩ gì thế ?
          </div>
      </div>
      <ListPost />
    </div>
    {showModal && <ModalPost setShowModal={setShowModal} />}
    </>
  )
}

export default Content