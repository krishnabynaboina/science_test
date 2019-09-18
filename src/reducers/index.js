import {combineReducers} from 'redux'
import postReducers from './postReducers'

export default combineReducers({
  data: postReducers
})
