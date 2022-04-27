import React ,{createContext,useReducer} from "react";
import axios from 'axios'
import { ApiUrl } from '../utils/contants'
import { SearchReducer } from "../reducer/search";

export const SearchContext = createContext()


const SearchContextProvider = ({children})=>{
    const [searchState,dispath] = useReducer(SearchReducer,{
        results:[],
        message:null,
        searchLoading:false
    })

    const SearchUser = async (query) =>{
        try {
            dispath({
                type: 'SEARCH_LOADING'
            })
            const res = await axios.get(`${ApiUrl}/search?search=${query}`)
            if(res.data){
                dispath({
                    type:"SEARCH_SUCCESS",
                    payload:{
                        searchLoading:false,
                        results:res.data.results,
                        message:res.data.message
                    }
                })
            }
            else{
                dispath({
                    type:"SEARCH_NO_RESULT",
                    payload:{
                        searchLoading:false,
                        results:[],
                        message:res.data.message
                    }
                })
            }
        } catch (error) {
            if (error.response ) return error.response.data
            return {
                success:false,
                message:'Có lỗi xảy ra'
            }
        }
    }
    const value = {SearchUser,searchState}
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}
export default SearchContextProvider