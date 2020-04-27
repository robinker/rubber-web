const initialState = {
    isLogged: false,
    role: '',
    token: null,
    gardens:[]
}

const userReducer = (state = initialState, action) => {
    switch(action.type){    
        case 'SIGN_IN':
            return state = {
                isLogged: true,
                ...action.payload,
                gardens: action.payload.gardens,
                role: action.payload.role[0]
            }
        case 'UPDATE' :
            let gardens = state.gardens
            gardens[action.payload.index] = action.payload.res
            return state = {
                ...state,
                gardens: gardens
            }
        case 'LOGOUT':
            return state = {
                isLogged: false,
                role: '',
                token: null,
                gardens:[]
            }
        default:
            return state
    }
}

export default userReducer