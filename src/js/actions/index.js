import request from 'request-promise'

export const loadTasksSuccess = (tasks) => ({type: 'LOAD_TASKS', tasks})
export const editTaskSuccess = (task) => ({type: 'EDIT_TASK', task})
export const editTask = (data) => {
  return (dispatch) => {
    return request({
      method: 'POST',
      uri: 'http://localhost:8000/edit',
      body: data,
      json: true
    }).then(
      (res) => {
        res.when = new Date(res.when)
        dispatch(editTaskSuccess(res))
      })
  }
}
export const deleteTodo = id => {
  return (dispatch) => {
    return request({
      method: 'POST',
      uri: 'http://localhost:8000',
      body: {
        id
      }
    }).then(
      (res) => {
        return { type: 'DELETE_TASK', id }
      })
  }
}
export const addTask = (data) => {
  return (dispatch) => {
    return request({
      method: 'POST',
      uri: 'http://localhost:8000',
      body: {
        data
      }
    }).then(
      (res) => {
        return { type: 'ADD_TASK' }
      })
  }
}
export function loadTasks () {
  return (dispatch) => {
    return request.get('http://localhost:8000/get/all').then(
      (res) => {
        console.log(res)
        let tasks = JSON.parse(res)
        dispatch(loadTasksSuccess(tasks))
      })
  }
}
