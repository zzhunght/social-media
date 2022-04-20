export const PostReducer = (state, action) =>{
    const {type,payload} = action;

    switch(type){
        case 'SET_POST':
            
            return {
                postLoading:payload.postLoading,
                posts:[
                    ...state.posts,
                    ...payload.posts
                ]
            }
        case 'SET_ONE_POST':
            return {
                ...state,
                postLoading:false,
                post:payload.post
            }
        case 'LIKE_POST':{
            return {
                ...state,
                posts:state.posts.map((post,i) =>{
                    if(post._id === payload.post._id){
                        return payload.post
                    }
                    return post
                })
            }
        }
        case 'FETCH_POST':
            return{
                ...state,
                postLoading:true
            }
        case 'REMOVE_LIKE_POST':{
            return {
                ...state,
                posts:state.posts.map((post,i) =>{
                    if(post._id === payload.post._id){
                        return payload.post
                    }
                    return post
                })
            }
        }
        default:
            return state
    }
}