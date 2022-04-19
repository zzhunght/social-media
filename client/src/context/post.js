import React, { createContext ,useEffect, useReducer} from 'react'
import axios from 'axios'
import setAuthToken, { accessToken, ApiUrl } from '../utils/contants'
import { PostReducer } from '../reducer/post'

export const PostContext = createContext()


const PostContextProvider = ({children})=>{
    const [postState,dispath] = useReducer(PostReducer,{
        posts:[
        ],
        postLoading:true,
        post:null
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
    const getPost = async (page) =>{
        try {
            const res = await axios.get(`${ApiUrl}/post?page=${page}`)
            if(res.data.success){
                dispath({
                    type: 'SET_POST',
                    payload:{
                        postLoading:false,
                        posts:res.data.posts
                    }
                })
                console.log(postState)
            }
        } catch (error) {
            if (error.response ) return error.response
            return {
                success:false,
                message:error.message
            }
        }
    }
    const likePost = async (id,user,pageIndex) =>{
        try {
            const res = await axios.patch(`${ApiUrl}/post/like`,{id,user})

            if(res.data.success){
                dispath({
                    type: 'LIKE_POST',
                    payload:{
                        post:res.data.post,
                        pageIndex:pageIndex
                    }
                })
            }
        } catch (error) {
            if (error.response ) return error.response
            return {
                success:false,
                message:error.message
            }
        }
    }
    const getOnePost = async (id) =>{
        try {
            dispath({
                type: 'FETCH_POST'
            })
            
            const res = await axios.get(`${ApiUrl}/post/${id}`,{id})
            console.log(res)
            if(res.data.success){
                dispath({
                    type: 'SET_ONE_POST',
                    payload:{
                        post:res.data.post,
                    }
                })
            }
        } catch (error) {
            if (error.response ) return error.response
            return {
                success:false,
                message:error.message
            }
        }
    }
    const removeLike = async (id,user,pageIndex) =>{
        try {
            const res = await axios.patch(`${ApiUrl}/post/remove-like`,{id,user})
            if(res.data.success){
                dispath({
                    type: 'REMOVE_LIKE_POST',
                    payload:{
                        post:res.data.post,
                        pageIndex:pageIndex
                    }
                })
            }
        } catch (error) {
            if (error.response ) return error.response
            return {
                success:false,
                message:error.message
            }
        }
    }
    const postvalue = {postPost,likePost,removeLike,postState,getPost,getOnePost}
    return (
        <PostContext.Provider value={postvalue}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider