export default function todos(state = {}, action) {
    switch (action.type) {
        case 'EDIT_TASK':
        return {
            tasks: state.tasks.map(function(task) {
            return task.id === action.id ?
            Object.defineProperty(action.data, 'isEditMode', {
                value: false
            }) : task;
        })};
        case 'CANCEL_EDIT':
        return {
            tasks: state.tasks.map(function(task) {
                return task.id === action.id ?
                Object.defineProperty(task, 'isEditMode', {
                    value: false
                }) : task;
            })
        }
        case 'DELETE_ITEM':
            return state.tasks.filter(task => task.id !== action.id);
        case 'ADD_TASK':
        let newId  = state.tasks.reduce((maxId, task) => Math.max(task.id, maxId), -1) + 1
            return {
                tasks: [
                    ...state.tasks,
                    Object.assign({}, {
                        id: newId,
                        name: "ID" + newId
                    })
                ]
        };
        case 'LOAD_TASKS':
            action.tasks.map(task =>
                Object.defineProperty(task, 'when', {
                    value: new Date(task.when)
            }));
            return {
                tasks: action.tasks
            };
        default:
            return state;
    }
}
