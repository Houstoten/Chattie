import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from './Chat/reducer';

export const store = createStore(rootReducer, applyMiddleware(thunk));
