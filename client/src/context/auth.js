import React, { createContext ,useEffect, useReducer} from 'react'
import axios from 'axios'
import { AuthReducer } from '../reducer/auth'
import setAuthToken, { accessToken, ApiUrl } from '../utils/contants'


export const AuthContext = createContext()

const AuthContextProvider =({children}) =>{
    const [authState, dispath] = useReducer(AuthReducer,{
        authLoading:true,
        isAuthenticated:false,
        user:null
    })
    const LoadUser = async () =>{
        setAuthToken(localStorage.getItem(accessToken))
        try {
            const res = await axios.get(`${ApiUrl}/auth`)
            if(res.data.success){
                dispath({
                    type:'SET_AUTH',
                    payload:{
                        isAuthenticated:true,
                        authLoading:false,
                        user:res.data.user
                    }
                })
            }
        } catch (error) {
            dispath({
                type:'SET_AUTH',
                payload:{
                    isAuthenticated:false,
                    authLoading:false,
                    user:null
                }
            })
            if (error.response) return error.response
            return {
                success:false,
                message:error.message
            }
            
        }
    }
    const LogOut = async ()=>{
        localStorage.removeItem(accessToken)
        dispath({
            type:'LOGOUT',
            payload:{}
        })
        await LoadUser()
    }
    const loginUser = async (form) =>{
        try {
            const res = await axios.post(`${ApiUrl}/auth/login`, form)
            if(res.data.success){
                localStorage.setItem(accessToken,res.data.accessToken)
                LoadUser()
                return res.data
            }
        } catch (error) {
            if (error.response) return error.response.data
            return {
                success:false,
                message:error.message
            }
            
        }
    }
    const registerUser = async (form) =>{
        try {
            const config = {
                headers:{
                  contentType: 'multipart/form-data',
                }
            }
            const res = await axios.post(`${ApiUrl}/auth/register`, form,config)
            if(res.data.success){
                localStorage.setItem(accessToken,res.data.accessToken)
                LoadUser()
                return res.data
            }
        } catch (error) {
            if (error.response) return error.response.data
            return {
                success:false,
                message:error.message
            }
            
        }
    }
    const updateAvatar = async (form) =>{
        try {
            const res = await axios.patch(`${ApiUrl}/auth/updateavatar`,form)
            if(res.data.success){
                return res.data
            }
        } catch (error) {
            if(error.response) return error.response.data
            return {
                success:false,
                message:'Vui lòng thử lại sau'
            }
        }
    }
    const updateName = async (form) =>{
        try {
            const res = await axios.patch(`${ApiUrl}/auth/updatename`,form)
            if(res.data.success){
                return res.data
            }
        } catch (error) {
            if(error.response) return error.response.data
            return {
                success:false,
                message:'Vui lòng thử lại sau'
            }
        }
    }
    const updatePassword = async (form) =>{
        try {
            const res = await axios.patch(`${ApiUrl}/auth/updatepassword`, form)
            if(res.data.success){
                localStorage.setItem(accessToken,res.data.accessToken)
                return res.data
            }
        } catch (error) {
            if(error.response) return error.response.data
            return {
                success:false,
                message:'Vui lòng thử lại sau'
            }
        }
    }
    const updateBio = async (form) =>{
        try {
            const res = await axios.patch(`${ApiUrl}/auth/updatebio`,form)
            if(res.data.success){
                return res.data
            }
        } catch (error) {
            if(error.response ) return error.response
            return {
                success: false,
                message: 'cập nhật không thành công'
            }
        }
    }
    useEffect(() => {
        LoadUser()
    },[])
    const value = {authState,loginUser,registerUser,LogOut,updatePassword,updateName,updateAvatar,updateBio}
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
