import React, { createContext ,useEffect, useReducer, useState} from 'react'
import axios from 'axios'
import setAuthToken, { accessToken, ApiUrl } from '../utils/contants'
import { PostReducer } from '../reducer/post'

export const PostContext = createContext()


const PostContextProvider = ({children})=>{
    //page để get post
    const [page,setPage] = useState(1)

    //nếu hết bài viết thì đóng băng lại không cho gọi nữa
    const [frezeGetPost,setFrezeGetPost] = useState(false)

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
    const getPost = async () =>{
        try {
            if(frezeGetPost) return null;
            dispath({
                type: 'FETCH_POST'
            })
            setPage(p=>p+1)
            const res = await axios.get(`${ApiUrl}/post?page=${page}`)
            if(res.data.success){
                dispath({
                    type: 'SET_POST',
                    payload:{
                        postLoading:false,
                        posts:res.data.posts
                    }
                })
            }
            else{
                dispath({
                    type: 'SET_POST',
                    payload:{
                        postLoading:false,
                        posts:res.data.posts
                    }
                })
                setFrezeGetPost(true)
                return res.data

            }
        } catch (error) {
            if (error.response ) return error.response
            return {
                success:false,
                message:error.message
            }
        }
    }
    const likePost = async (id,user,owner,name) =>{
        // id:id của post , user: người like, name:tên ng like , owner : chủ của post

        try {
            const res = await axios.patch(`${ApiUrl}/post/like`,{id,user,owner,name})

            if(res.data.success){
                dispath({
                    type: 'LIKE_POST',
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
    const getOnePost = async (id) =>{
        try {
            dispath({
                type: 'FETCH_POST'
            })
            
            const res = await axios.get(`${ApiUrl}/post/${id}`,{id})
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
    const removeLike = async (id,user,owner,name) =>{
        // id:id của post , user: người like, name:tên ng like , owner : chủ của post
        try {
            const res = await axios.patch(`${ApiUrl}/post/remove-like`,{id,user,owner,name})
            if(res.data.success){
                dispath({
                    type: 'REMOVE_LIKE_POST',
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
    const cmt = async (form) =>{
        try {
            const res = await axios.patch(`${ApiUrl}/post/cmt`,form)
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
    const postvalue = {postPost,likePost,removeLike,postState,getPost,getOnePost,cmt}
    return (
        <PostContext.Provider value={postvalue}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider