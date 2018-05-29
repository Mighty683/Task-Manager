
function returnWrap (result) {
  result.time = new Date().getTime()
  return {
    ...result
  }
}

export default function Errors (state = { errors: {} }, error) {
  let errors
  switch (error.type) {
    // Login errors
    case 'LOGIN_ERROR':
      errors = state.errors
      errors.login = {
        msg: 'Wrong Login or Password'
      }
      return returnWrap({errors})
    case 'REMOVE_LOGIN_ERROR':
      errors = state.errors
      delete errors.login
      return returnWrap({errors})

    // Task Errors
    case 'LOAD_ERROR':
      errors = state.errors
      errors.load = {
        msg: 'Load Tasks Error'
      }
      return returnWrap({errors})
    case 'EDIT_ERROR':
      errors = state.errors
      errors[`task_${error.id}`] = {
        msg: 'Edit Task error'
      }
      return returnWrap({errors})
    case 'DELETE_ERROR':
      errors = state.errors
      errors[`task_${error.id}`] = {
        msg: 'Delete Task error'
      }
      return returnWrap({errors})
    case 'REMOVE_LOAD_ERROR':
      errors = state.errors
      delete errors.load
      return returnWrap({errors})
    case 'REMOVE_EDIT_ERROR':
      errors = state.errors
      delete errors[`task_${error.id}`]
      return returnWrap({errors})
    case 'REMOVE_DELETE_ERROR':
      errors = state.errors
      delete errors[`task_${error.id}`]
      return returnWrap({errors})
    default:
      return state
  }
}
