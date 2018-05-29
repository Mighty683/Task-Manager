import axios from 'axios'

// Tasks API
export const loadError = () => ({type: 'LOAD_ERROR'})
export const editError = (id) => ({type: 'EDIT_ERROR', id})
export const deleteError = (id) => ({type: 'DELETE_ERROR', id})
export const removeLoadError = (res) => ({type: 'REMOVE_LOAD_ERROR'})
export const removeEditError = (id) => ({type: 'REMOVE_EDIT_ERROR', id})
export const removeDeleteError = (id) => ({type: 'REMOVE_DELETE_ERROR', id})
export const loadTasksSuccess = (tasks) => ({type: 'LOAD_TASKS', tasks})
export const editTaskSuccess = (task) => ({type: 'EDIT_TASK', task})
export const editTask = (token, data) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: 'http://localhost:15432/edit',
      data: {
        ...data,
        token
      },
      responseType: 'json'
    }).then(
      (res) => {
        dispatch(editTaskSuccess(res.data))
        dispatch(removeEditError(data.id))
      })
      .catch((res) => {
        dispatch(editError(data.id))
      })
  }
}
export const deleteTask = (token, id) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: 'http://localhost:15432/delete',
      data: {
        token,
        id
      },
      responseType: 'json'
    }).then(
      (res) => {
        dispatch(loadTasksSuccess(res.data))
        dispatch(removeDeleteError(id))
      })
      .catch((res) => {
        dispatch(deleteError(id))
      })
  }
}
export const addTask = (token, data) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: 'http://localhost:15432/add',
      data: {
        token,
        ...data
      },
      responseType: 'json'
    }).then(
      (res) => {
        dispatch(loadTasksSuccess(res.data))
        dispatch(removeLoadError())
      })
      .catch((res) => {
        dispatch(loadError())
      })
  }
}
export function loadTasks (token) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: 'http://localhost:15432/get/all',
      data: {
        token: token
      },
      responseType: 'json'
    }).then(
      (res) => {
        dispatch(loadTasksSuccess(res.data))
        dispatch(removeLoadError())
      })
      .catch((res) => {
        dispatch(loadError())
      })
  }
}
