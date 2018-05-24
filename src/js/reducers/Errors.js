export default function Errors (state = { errors: {} }, error) {
  switch (error.type) {
    case 'LOAD_ERROR':
      state.errors.load = {
        msg: 'Load Tasks Error'
      }
      return {errors: state.errors}
    case 'EDIT_ERROR':
      state.errors[`task_${error.id}`] = {
        msg: 'Edit Task error'
      }
      return {errors: state.errors}
    case 'DELETE_ERROR':
      state.errors[`task_${error.id}`] = {
        msg: 'Delete Task error'
      }
      return {errors: state.errors}
    case 'REMOVE_LOAD_ERROR':
      delete state.errors.load
      return {errors: state.errors}
    case 'REMOVE_EDIT_ERROR':
      delete state.errors[`task_${error.id}`]
      return {errors: state.errors}
    case 'REMOVE_DELETE_ERROR':
      delete state.errors[`task_${error.id}`]
      return {errors: state.errors}
    default:
      return state
  }
}
