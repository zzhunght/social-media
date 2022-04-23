export const MesReducer = (state, action)=>{

    const {type , payload} = action;

    switch (type) {
        case 'SET_MES':
            return {
                ...state,
                ...payload,
            }
        case 'FETCH_MES':
            return {
                ...state,
                ...payload,
            }
        case 'CHAT_REAL_TIME':{
           
            return {
                ...state,
                mes:[
                    ...state.mes,
                    payload.data
                ]
            }
        }
        default:
            break;
    }
}