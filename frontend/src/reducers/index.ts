import { combineReducers } from 'redux'
import messages from '../Chat/reducer'
import edit from '../MessageEdit/reducer'
import thisUser from '../LoginPage/reducer'
import userEditCreate from '../EditCreateUser/reducer'


const rootReducer = combineReducers({
    messages,
    edit,
    thisUser,
    userEditCreate
})

export default rootReducer;
