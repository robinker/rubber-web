const initialState = {
    friendlist: []
}

const friendReducer = (state = initialState, action) => {
    switch(action.type){    
        case 'getFriends':
            return state = {
                friendlist: [...action.payload]
            }
        default:
            return state
    }
}

export default friendReducer