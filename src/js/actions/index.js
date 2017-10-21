import request from 'request-promise';

export const editTask = (id, data) => ({ type: 'EDIT_TASK', id, data })
export const deleteTodo = id => ({ type: 'DELETE_TASK', id })
export const addTask = (data) => ({ type: 'ADD_TASK' })
export const loadTasksSuccess = (tasks) => ({type: "LOAD_TASKS", tasks})
export const cancelTaskEdit = (id) => ({type: "CANCEL_EDIT", id})
export function loadTasks() {
    return  (dispatch) => {
        return request.get('http://localhost:8000/get/all').then(
            (res) => {
                let tasks = JSON.parse(res);
                dispatch(loadTasksSuccess(tasks));
            });
    }
}
