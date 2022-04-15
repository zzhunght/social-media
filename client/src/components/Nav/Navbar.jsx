import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import './NavbarStyle.css'
function Navbar() {
  return (
    <div className="navbar">
        <div className="navbar-left">
            <div className="logo">
                <img src="logo.png" alt="logo" />
            </div>
            <div className="seacrh-box">
                <div className="icon-search"><SearchOutlined /></div>
                <input type="text" className="search-box" placeholder="Tìm kiếm"/>
            </div>
        </div>
        <div className="navbar-mid"></div>
        <div className="navbar-right"></div>
    </div>
  )
}

export default Navbar