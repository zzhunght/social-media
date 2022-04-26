import React from 'react'
import {FiSearch} from 'react-icons/fi'

function Search() {
  return (
    <div className="search-wr">
        <div className="search">
            <input type="text" placeholder="Tìm ai đó ?" className="search-input"/>
            <div className="search-icon">
                <FiSearch />
            </div>
        </div>
    </div>
  )
}

export default Search