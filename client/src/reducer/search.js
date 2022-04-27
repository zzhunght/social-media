export const SearchReducer = (state, action) =>{
    const {type,payload} = action;
    switch(type){
        case 'SEARCH_SUCCESS':
            return {
                ...state,
                ...payload
            }
        case 'SEARCH_NO_RESULT':
        return {
            ...state,
            ...payload
        }
        case 'SEARCH_LOADING':
            return {
                ...state,
                searchLoading:true,
                results:[],
                message:null
            }
        default:
            return state
    }
}