import axios from 'axios'
import React , { createContext, useReducer} from 'react'
import { MesReducer } from '../reducer/mes'
import { ApiUrl } from '../utils/contants'

export const MesContext = createContext()


const MesContextProvider = ({children}) => {
    const [mesState,dispath] = useReducer(MesReducer,{
        mesLoading: true,
        mes:[],
        chatWith:null,
        conversationId:null
    })
    const getMes = async(id) => {
        try {
            if(!id) {
                return undefined
            }
            else{
                dispath({
                    type: 'FETCH_MES',
                    payload:{
                        mesLoading:true,
                    }
                })
                const chatwith = await axios.get(`${ApiUrl}/profile/user/${id}/name`)
                const getConversationsId = await axios.get(`${ApiUrl}/conversation/${id}/1`)
                const conversationId = getConversationsId.data.conversation._id
                const mes = await axios.get(`${ApiUrl}/mes/${conversationId}`)
                
                if(mes.data.success){
                    dispath({
                        type: 'SET_MES',
                        payload:{
                            mes:mes.data.mes,
                            mesLoading:false,
                            chatWith:chatwith.data.user,
                            conversationId
                        },
                        
                    })
                }

            }
        } catch (error) {
            if(error.message) return error.message
            return {
                success:false,
                message:error.message
            }
        }
    }
    const chatRealTime = (data)=>{
        dispath({
            type: 'CHAT_REAL_TIME',
            payload:{
                data
            }
        })
    }
    const SaveMsgDB = async (msg) => {
        try {
            const res = await axios.post(`${ApiUrl}/mes`,msg)
        } catch (error) {
            
        }
    }
    const value = {mesState,getMes,SaveMsgDB,chatRealTime}
    return (
        <MesContext.Provider value={value} >
            {children}
        </MesContext.Provider>
    )
}

export default MesContextProvider