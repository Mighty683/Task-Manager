import { combineReducers } from 'redux'
import tasks from './Tasks'
import errors from './Errors'

const rootReducer = combineReducers({
  tasks,
  errors
})

export default rootReducer
