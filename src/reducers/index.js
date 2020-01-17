import userReducer from './user'
import friendReducer from './friends'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    user: userReducer,
    friends: friendReducer,
})

export default reducers
