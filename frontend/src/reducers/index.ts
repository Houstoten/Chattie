import { combineReducers } from 'redux'
import messages from '../Chat/reducer'
import edit from '../MessageEdit/reducer'
import thisUser from '../LoginPage/reducer'


const rootReducer = combineReducers({
    messages,
    edit,
    thisUser
})

export default rootReducer;
