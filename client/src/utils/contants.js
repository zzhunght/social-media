import axios from "axios";
export const accessToken = 'AccessToken'
export const ApiUrl = 'http://localhost:5000/api'
export const BaseUrl = 'http://localhost:5000'

export const setAuthToken = (token)=>{
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
		delete axios.defaults.headers.common['Authorization']
	}
}
export default setAuthToken;
