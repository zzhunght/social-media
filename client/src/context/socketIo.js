import { createContext, useContext, useEffect, useRef} from "react";
import { io } from "socket.io-client";
import { MesContext } from "./mes";
import {socketUrl} from '../utils/contants'


export const SocketContext = createContext()
const SocketContextProvider = ({children})=>{
    const socket = useRef()
    const {mesState:{conversationId},chatRealTime} = useContext(MesContext)

    const SendMsgSocket = (data)=>{
        socket.current.emit("client-send-mes",data)
    }
    useEffect(() => {
        socket.current = io(socketUrl)
        socket.current.on("mes-from-server", (data) => {
            console.log(data)
            chatRealTime(data)
        });
    },[])
    useEffect(() => {
        if(socket){
            socket.current.emit('join-room',conversationId)
        }
    },[conversationId])
    const value = {SendMsgSocket}

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}


export default SocketContextProvider