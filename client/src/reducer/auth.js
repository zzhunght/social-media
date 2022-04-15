
export const AuthReducer = (state, action) =>{

    const {type , payload} = action;
    switch(type){
        case 'SET_AUTH':
            return {
                ...state,
                ...payload
            }
        case 'LOGOUT':
            return {
                authLoading:false,
                isAuthenticated:false,
                user:null
            }
        
        default: return state
    }

}