import axios from "axios";
export const accessToken = 'AccessToken'
export const ApiUrl = 'https://server-38-node.herokuapp.com/api'
export const BaseUrl = 'https://server-38-node.herokuapp.com'

// server deploy trên heroku
const herokuUrl = 'https://server-38-node.herokuapp.com/api'
const socketUrl = 'https://socket-io-38.herokuapp.com'

export const setAuthToken = (token)=>{
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
		delete axios.defaults.headers.common['Authorization']
	}
}
export default setAuthToken;
