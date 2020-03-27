export const signIn = (res) => {
    return {
        type: 'SIGN_IN',
        payload: res
    }
}

export const update = (res, index) => {
    return {
        type: 'UPDATE',
        payload: {res, index}
    }
}

export const getFriend = (res) => {
    return {
        type: 'GET_FRIENDS',
        payload: res
    }
}

export const getData = () => {
    return{
        type: 'getData'
    }
}