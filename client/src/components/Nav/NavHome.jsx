import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import './NavbarStyle.css'
function NavHome() {
  return (
    <div className="navbar">
        <div className="navbar-left">
            <div className="logo">
              <p className="logo-brand">HIRO</p>
            </div>
            
        </div>
        
        <div className="navbar-right">
          <div className="seacrh-box">
            <div className="icon-search"><SearchOutlined /></div>
            <input type="text" className="search-box" placeholder="Tìm kiếm"/>
          </div>
        </div>
    </div>
  )
}

export default NavHome