import { AiFillHome } from "react-icons/ai";
import { BsFillChatFill,BsFillBellFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import React, { useContext, useEffect} from 'react'
import { AuthContext } from "../../context/auth";
import { Link, useLocation } from "react-router-dom";

function NavBottom() {
    const {authState:{isAuthenticated}} = useContext(AuthContext)
    const location = useLocation()
    console.log('location', location)

    return (
    <>
    {isAuthenticated? (
        <div className="nav-bt">
            <div className="nav-bt-l">
                <Link to="/home" className="nav-bt-i">
                    <AiFillHome className={`nav-bt-i-icon ${location.pathname === '/home' ? 'active': ''}`} />
                </Link>
                <div className="nav-bt-i">
                    <BsFillChatFill className={`nav-bt-i-icon ${location.pathname === '/mes' ? 'active': ''}`} />
                </div>
                <div className="nav-bt-i">
                    <BsFillBellFill className={`nav-bt-i-icon ${location.pathname === '/notification' ? 'active': ''}`} />
                </div>
                <Link to="/my-profile" className="nav-bt-i">
                    <FaUserAlt className={`nav-bt-i-icon ${location.pathname === '/my-profile' ? 'active': ''}`} />
                </Link>
            </div>
        </div>
    ): ''}
    </>
  )
}

export default NavBottom