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
    const LogOut = ()=>{
        localStorage.removeItem(accessToken)
        dispath({
            type:'LOGOUT',
            payload:{}
        })
    }
    const loginUser = async (form) =>{
        try {
            const res = await axios.post(`${ApiUrl}/auth/login`, form)
            if(res.data.success){
                localStorage.setItem(accessToken,res.data.accessToken)
                LoadUser()
            }
        } catch (error) {
            if (error.response) return error.response
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
            if (error.response) return error.response
            return {
                success:false,
                message:error.message
            }
            
        }
    }

    useEffect(() => {
        LoadUser()
    },[])
    const value = {authState,loginUser,registerUser,LogOut}
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
