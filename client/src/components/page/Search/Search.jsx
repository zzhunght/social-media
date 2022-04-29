import { LoadingOutlined } from '@ant-design/icons'
import React, { useContext, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import {FiSearch} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { ProfileContext } from '../../../context/profile'
import { SearchContext } from '../../../context/search'
import './Search.css'

function Search() {
  const [query,setQuery] = useState('')

  const {profileState:{myprofile:{user}}} = useContext(ProfileContext)
  const {searchState:{results,searchLoading,message},SearchUser} = useContext(SearchContext)

  const inputChange = e =>setQuery(e.target.value)
  const onKeyDown = async (e) => {
    if(e.keyCode === 13 || e.key === 'Enter') {
      await SearchUser(query)
    }
  }
  return (
    <div className="search-wr">
        <div className="search">
            <input
             type="text" 
             placeholder="Tìm ai đó ?" 
             className="search-input"
             value={query}
             onChange={inputChange}
             onKeyDown={onKeyDown}
            />
            <div className="search-icon" onClick={()=>SearchUser(query)}>
                <FiSearch />
            </div>
        </div>
        <div className="search-result">

          <div className="search-message">
            {message ? message : ''}
          </div>
          <div className="list-users">
            {results && results.length > 0 && 
              results?.map((u,i)=> (
                <>
                <div className="s-i-u-w">
                  <div className="search-item-user" key={i}>
                    <div className="search-item-user-avatar">
                        <img src={`${u?.avatar || 'avatar.jpg'}`} alt="avatar"  />
                    </div>
                    <Link className="search-item-user-info" to={`/${u?._id === user?._id ? 'my-profile':`profile/${u?._id}`}`}>
                        <div className="search-item-user-name">
                            {u?.firstName} {u?.lastName}
                            <span  className="check-icon"><FaCheckCircle/></span>
                        </div>
                        <div className="search-item-user-sub-name">
                            @{u?.firstName}{u?.lastName}
                        </div>
                    </Link>
                  </div>
                  {u?.bio && (
                    <div className="search-user-bio">
                      {u.bio}
                    </div>
                  )}
                </div>
                </>
              ))
            }
          </div>
          {searchLoading && (
            <div className="loading-post">
              <LoadingOutlined className="loading-icon" />
            </div>
          )}

        </div>
    </div>
  )
}

export default Search