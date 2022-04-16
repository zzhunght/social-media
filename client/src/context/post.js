import React, { createContext ,useEffect, useReducer} from 'react'
import axios from 'axios'
import setAuthToken, { accessToken, ApiUrl } from '../utils/contants'
import { PostReducer } from '../reducer/post'

export const PostContext = createContext()


const PostContextProvider = ({children})=>{
    const [postState,dispath] = useReducer(PostReducer,{
        posts:[],
        postLoading:true,
    })
    
    const postPost = async (formdata) =>{
        try {
            const res = await axios.post(`${ApiUrl}/post`,formdata)
            if(res.data.success) return res.data
        } catch (error) {
            if (error.response ) return error.response
            return {
                success:false,
                message:error.message
            }
        }
    }
    const postvalue = {postPost,postState}
    return (
        <PostContext.Provider value={postvalue}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider