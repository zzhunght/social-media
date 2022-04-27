import { createContext, useContext, useEffect, useReducer } from "react";
import axios from 'axios'
import { ProfileReducer } from "../reducer/profile";
import setAuthToken, {accessToken, ApiUrl } from "../utils/contants"
import { AuthContext } from "./auth";




export const ProfileContext = createContext()
const ProfileContextProvider = ({children})=>{
    const {authState:{isAuthenticated}} = useContext(AuthContext)

    const [profileState,dispath] = useReducer(ProfileReducer,{
        myprofile:null,
        myprofileLoading:true,
        strprofileLoading:true,
        strprofile:null,
    });
    
    const getMyProfile = async ()=>{
        setAuthToken(localStorage.getItem(accessToken))
        try {
            const res = await axios.get(`${ApiUrl}/profile/my-profile`)
            if(res.data.success){
                dispath({
                    type: 'SET_PROFILE',
                    payload:{
                        myprofile:{
                            user: res.data.user,
                            friend:res.data.friend,
                            posts: res.data.posts
                        },
                        myprofileLoading:false
                    }
                })
            }
        } catch (error) {
            if(error.response ) return error.response
            return {
                success: false,
                message: error.message
            }
        }
    }
    const getStrProfile = async (id)=>{
        try {
            dispath({
                type: 'FETCH_STR_PROFILE',
                payload:{
                    strprofileLoading:true
                }
            })
            const res = await axios.get(`${ApiUrl}/profile/user/${id}`)
            if(res.data.success){
                dispath({
                    type: 'SET_STR_PROFILE',
                    payload:{
                        strprofile:{
                            user: res.data.user,
                            friend:res.data.friend,
                            posts: res.data.posts
                        },
                        strprofileLoading:false
                    }
                })
            }
        } catch (error) {
            if(error.response ) return error.response
            return {
                success: false,
                message: error.message
            }
        }
    }
    const addFriend = async (addId) => {
        try {
           
            const res = await axios.get(`${ApiUrl}/profile/add-friend/${addId}`)
            if(res.data.success){
                dispath({
                    type: 'ADD_FRIEND',
                    payload:{
                        friend: res.data.friend
                    }
                })
            }
        } catch (error) {
            if(error.response ) return error.response
            return {
                success: false,
                message: error.message
            }
        }
    }
    const cancelAddFriend = async (addId) => {
        try {
           
            const res = await axios.get(`${ApiUrl}/profile/cancel-add-friend/${addId}`)
            if(res.data.success){
                dispath({
                    type: 'REMOVE_ADD_FRIEND',
                    payload:{
                        friend: res.data.friend
                    }
                })
            }
        } catch (error) {
            if(error.response ) return error.response
            return {
                success: false,
                message: error.message
            }
        }
    }
    const acceptFriend = async (addId) =>{
        try {
           
            const res = await axios.get(`${ApiUrl}/profile/accept-friend/${addId}`)
            if(res.data.success){
                dispath({
                    type: 'ACCEPT_FRIEND',
                    payload:{
                        friend: res.data.friend
                    }
                })
            }
        } catch (error) {
            if(error.response ) return error.response
            return {
                success: false,
                message: error.message
            }
        }
    }
    const rejectFriend = async (addId) =>{
        try {
           
            const res = await axios.get(`${ApiUrl}/profile/reject-friend/${addId}`)
            if(res.data.success){
                dispath({
                    type: 'REJECT_FRIEND',
                    payload:{
                        friend: res.data.friend
                    }
                })
            }
        } catch (error) {
            if(error.response ) return error.response
            return {
                success: false,
                message: error.message
            }
        }
    }

    const updateBg = async (form) =>{
        try {
           
            const res = await axios.patch(`${ApiUrl}/auth/updatebg`,form)
            if(res.data.success){
                dispath({
                    type: 'UPDATE_PROFILE',
                    payload:{
                        user:res.data.user
                    }
                })
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
        getMyProfile()
    },[isAuthenticated])
    const profileValue = {
        profileState,
        getMyProfile,
        getStrProfile,
        addFriend,
        cancelAddFriend,
        acceptFriend,
        rejectFriend,
        updateBg,
    
    }
    return (
        <ProfileContext.Provider value={profileValue}>
            {children}
        </ProfileContext.Provider>
    )
}


export default ProfileContextProvider