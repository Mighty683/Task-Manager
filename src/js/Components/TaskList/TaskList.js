import React from 'react'
import Task from './Task'
export default class TaskList extends React.Component {
  render () {
    return (
      <table class='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Where?</th>
            <th>When?</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tasks.map(function (task) {
            return <Task {... {data: task, actions: this.props.actions}} />
          }.bind(this))}
        </tbody>
      </table>
    )
  }
}
