import { combineReducers } from 'redux'
import messages from '../Chat/reducer'
import edit from '../MessageEdit/reducer'


const rootReducer = combineReducers({
    messages,
    edit
})

export default rootReducer;
