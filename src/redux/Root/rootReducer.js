import {combineReducers} from 'redux'
import highlightsReducer from '../Reducers/highlightsReducer'
import watchScreenReducer from '../Reducers/watchScreenReducer'


const rootReducer = combineReducers({
    highlightState: highlightsReducer,
    watchScreenState: watchScreenReducer

})
export default rootReducer
