
export const ProfileReducer = (state, action) =>{

    const {type , payload} = action;
    switch(type){
        case 'SET_PROFILE':
            return {
                ...state,
                ...payload
            }
        case 'SET_STR_PROFILE':
            return {
                ...state,
                ...payload
            }
        case 'FETCH_STR_PROFILE':
            return {
                ...state,
                ...payload
            }
        case 'ADD_FRIEND':
            return {
                ...state,
                myprofile:{
                    ...state.myprofile,
                    friend:payload.friend
                }
            }
        case 'REMOVE_ADD_FRIEND':
            return {
                ...state,
                myprofile:{
                    ...state.myprofile,
                    friend:payload.friend
                }
            }
        case 'ACCEPT_FRIEND':
            return {
                ...state,
                myprofile:{
                    ...state.myprofile,
                    friend:payload.friend
                }
            }
        case 'REJECT_ADD_FRIEND':
            return {
                ...state,
                myprofile:{
                    ...state.myprofile,
                    friend:payload.friend
                }
            }
        default: return state
    }

}