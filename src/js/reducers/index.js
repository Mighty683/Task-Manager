import { combineReducers } from 'redux'
import tasks from './Tasks'
import errors from './Errors'
import user from './User'

const rootReducer = combineReducers({
  tasks,
  errors,
  user
})

export default rootReducer
