import { BellOutlined, HomeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'

function NavBottom() {
  return (
    <div className="nav-bt">
        <div className="nav-bt-l">
            <div className="nav-bt-i">
                <HomeOutlined className="nav-bt-i-icon active" />
            </div>
            <div className="nav-bt-i">
                <MessageOutlined className="nav-bt-i-icon " />
            </div>
            <div className="nav-bt-i">
                <BellOutlined className="nav-bt-i-icon" />
            </div>
            <div className="nav-bt-i">
                <UserOutlined className="nav-bt-i-icon" />
            </div>
        </div>
    </div>
  )
}

export default NavBottom