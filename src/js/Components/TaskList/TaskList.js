import React from 'react'
import Task from './Task'
import Error from '../Errors/Error.js'
const TaskList = (props) => {
  return (
    props.errors && props.errors.load
      ? <Error {...props.errors.load} />
      : <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Where?</th>
            <th>When?</th>
          </tr>
        </thead>
        <tbody>
          {props.tasks && props.tasks.map(function (task) {
            return <Task key={task.id} {... {data: task, actions: props.actions, errors: props.errors}} />
          })}
        </tbody>
      </table>
  )
}

export default TaskList
