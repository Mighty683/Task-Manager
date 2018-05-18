import request from 'request-promise'

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
      })
  }
}
export function loadTasks () {
  return (dispatch) => {
    return request.get('http://localhost:15432/get/all').then(
      (res) => {
        let tasks = JSON.parse(res)
        dispatch(loadTasksSuccess(tasks))
      })
  }
}
