export const PostReducer = (state, action) =>{
    const {type,payload} = action;

    switch(type){
        case 'SET_POST':
            return {
                postLoading:payload.postLoading,
                posts:[
                    ...state.posts,
                    {
                        page:payload.posts
                    }
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
                posts:state.posts.map((page,i) =>{
                    if(i === payload.pageIndex){
                        const newposts = page.page.map(post=>{
                            
                            if(post._id === payload.post._id){
                                return payload.post
                            }
                            return post
                        })
                        return {
                            // vì posts là 1 mảng gồm nhiều { page:[]},nên phải trả về 1 object chứa key page
                            page :[
                                ...newposts
                            ]
                        }
                    }
                    return page
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
                posts:state.posts.map((page,i) =>{
                    if(i === payload.pageIndex){
                        const newposts = page.page.map(post=>{
                            
                            if(post._id === payload.post._id){
                                return payload.post
                            }
                            return post
                        })
                        return {
                            // vì posts là 1 mảng gồm nhiều { page:[]},nên phải trả về 1 object chứa key page
                            page :[
                                ...newposts
                            ]
                        }
                    }
                    return page
                })
            }
        }
        default:
            return state
    }
}