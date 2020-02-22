const initialState = {
    friendlist: []
}

const friendReducer = (state = initialState, action) => {
    switch(action.type){    
        case 'GET_FRIENDS':
            return state = {
                friendlist: [...action.payload]
            }
        default:
            return state
    }
}

export default friendReducer