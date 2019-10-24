import loggedReducer from './isLogged'
import roleReducer from './role'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    isLogged: loggedReducer,
    role: roleReducer,
})

export default reducers
