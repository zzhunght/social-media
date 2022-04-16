import React, { useContext, useState } from 'react'
import {AuthContext} from '../../../context/auth'
import { BaseUrl } from '../../../utils/contants'
import ModalPost from '../../Modal/ModalPost'
import NavHome from '../../Nav/NavHome'
import './ContentStyle.css'

function Content() {
  const {authState:{user}} = useContext(AuthContext)
  const [showModal,setShowModal]= useState(false)
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
    </div>
    {showModal && <ModalPost setShowModal={setShowModal} />}
    </>
  )
}

export default Content