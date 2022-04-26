import React, { useEffect, useState } from 'react'
import {GrClose} from 'react-icons/gr'

function ImageShow({data,setShowModal}) {
    const [image,setImage] = useState('')

    useEffect(() => {
        setImage(data)
    },[data])

    return (
    <div className="modal">
       <div className="img-modal">
        <div className="close-img-modal" onClick={()=>setShowModal(false)}>
                <GrClose />
            </div>
            <div className="modal-img-show">
                <img src={image} alt="" />
            </div>
       </div>
    </div>
  )
}

export default ImageShow