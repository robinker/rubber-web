const roleReducer = (state = '', action) => {
    switch(action.type){
        case 'ADMIN':
            return 'admin'
        case 'GARDENER':
            return 'gardener'
        case 'MIDDLEMAN':
            return 'middleman'
        default:
            return state
    }
}

export default roleReducer