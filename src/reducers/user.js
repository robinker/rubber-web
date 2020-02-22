const initialState = {
    isLogged: false,
    role: '',
    token: null,
}

const userReducer = (state = initialState, action) => {
    switch(action.type){    
        case 'SIGN_IN':
            return state = {
                isLogged: true,
                ...action.payload,
                role: action.payload.role[0]
            }
        default:
            return state
    }
}

export default userReducer