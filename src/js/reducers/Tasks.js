export default function Tasks (state = [], action) {
  switch (action.type) {
    case 'EDIT_TASK':
      return [...state.map(function (task) {
        return task.id === action.task.id
          ? action.task : task
      })
      ]
    case 'DELETE_ITEM':
      return [
        ...state.filter(task => task.id !== action.id)
      ]
    case 'ADD_TASK':
      let newId = state.reduce((maxId, task) => Math.max(task.id, maxId), -1) + 1
      return [
        ...state,
        Object.assign({}, {
          id: newId,
          name: 'ID' + newId
        })
      ]
    case 'LOAD_TASKS':
      action.tasks.map(task =>
        Object.defineProperty(task, 'when', {
          value: new Date(task.when)
        }))
      return [
        ...action.tasks
      ]
    default:
      return state
  }
}
