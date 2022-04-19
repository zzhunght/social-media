import { AiFillHome } from "react-icons/ai";
import { BsFillChatFill,BsFillBellFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import React, { useContext, useEffect} from 'react'
import { AuthContext } from "../../context/auth";

function NavBottom() {
    const {authState:{isAuthenticated}} = useContext(AuthContext)

    
    return (
    <>
    {isAuthenticated? (
        <div className="nav-bt">
            <div className="nav-bt-l">
                <div className="nav-bt-i">
                    <AiFillHome className="nav-bt-i-icon active" />
                </div>
                <div className="nav-bt-i">
                    <BsFillChatFill className="nav-bt-i-icon " />
                </div>
                <div className="nav-bt-i">
                    <BsFillBellFill className="nav-bt-i-icon" />
                </div>
                <div className="nav-bt-i">
                    <FaUserAlt className="nav-bt-i-icon" />
                </div>
            </div>
        </div>
    ): ''}
    </>
  )
}

export default NavBottom