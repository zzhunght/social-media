import React, { useContext, useState } from 'react'
import {AuthContext} from '../../../context/auth'
import ListPost from '../../ListPost/ListPost'
import ModalPost from '../../Modal/ModalPost'
import NavHome from '../../Nav/NavHome'
import './ContentStyle.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = () =>{
  return (
    <>
      <div className="label-post-stt">
          <div className="skeleton-circle">
            <Skeleton style={{width:'100%', height:'100%'}} circle />
          </div>
          <div className="skeleton-polite">
            <Skeleton style={{width:'100%', height:'100%'}} />
          </div>
      </div>
    </>
  )
}


function Content() {
  const {authState:{user,authLoading,isAuthenticated}} = useContext(AuthContext)
  const [showModal,setShowModal]= useState(false)


  return (
    <>
    <div className="main">
      <NavHome />
      {authLoading && <Loading />}
      {isAuthenticated && (
        <div className="label-post-stt">
          <div className="label-post-stt-avata">
              <img src={`${user && user.avatar? user.avatar : 'avatar.jpg'}`} alt="avata" />
          </div>
          <div className="label-post-stt-title" onClick={() =>setShowModal(true)}>
              {user && user.lastName? user.lastName : ''} ơi! Bạn đang nghĩ gì thế ?
          </div>
        </div>
      )}
      <ListPost />
    </div>
    {showModal && <ModalPost setShowModal={setShowModal} />}
    </>
  )
}

export default Content