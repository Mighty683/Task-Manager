import request from 'request-promise'
export const loadError = (res) => ({type: 'LOAD_ERROR'})
export const editError = (err) => ({type: 'EDIT_ERROR', err})
export const deleteError = (err) => ({type: 'DELETE_ERROR', err})
export const removeLoadError = (res) => ({type: 'REMOVE_LOAD_ERROR'})
export const removeEditError = (err) => ({type: 'REMOVE_EDIT_ERROR', err})
export const removeDeleteError = (err) => ({type: 'REMOVE_DELETE_ERROR', err})
export const loadTasksSuccess = (tasks) => ({type: 'LOAD_TASKS', tasks})
export const editTaskSuccess = (task) => ({type: 'EDIT_TASK', task})
export const editTask = (data) => {
  return (dispatch) => {
    return request({
      method: 'POST',
      uri: 'http://localhost:15432/edit',
      body: data,
      json: true
    }).then(
      (res) => {
        dispatch(editTaskSuccess(res))
        dispatch(removeEditError(data.id))
      })
      .catch((res) => {
        dispatch(editError(data.id))
      })
  }
}
export const deleteTask = id => {
  return (dispatch) => {
    return request({
      method: 'POST',
      uri: 'http://localhost:15432/delete',
      body: {
        id
      },
      json: true
    }).then(
      (res) => {
        dispatch(loadTasksSuccess(res))
        dispatch(removeDeleteError(id))
      })
      .catch((res) => {
        dispatch(deleteError(id))
      })
  }
}
export const addTask = (data) => {
  return (dispatch) => {
    return request({
      method: 'POST',
      uri: 'http://localhost:15432/add',
      body: {
        data
      },
      json: true
    }).then(
      (res) => {
        dispatch(loadTasksSuccess(res))
        dispatch(removeLoadError())
      })
      .catch((res) => {
        dispatch(loadError())
      })
  }
}
export function loadTasks () {
  return (dispatch) => {
    return request.get('http://localhost:15432/get/all').then(
      (res) => {
        let tasks = JSON.parse(res)
        dispatch(loadTasksSuccess(tasks))
        dispatch(removeLoadError())
      })
      .catch((res) => {
        dispatch(loadError())
      })
  }
}
