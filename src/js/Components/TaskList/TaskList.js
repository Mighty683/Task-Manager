import React from 'react'
import Task from './Task'
export default class TaskList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div class='container bg-black'>
        <div class='row bg-olive'>
          <div class='col-2'>Name</div>
          <div class='col-5'>Description</div>
          <div class='col-2'>Where?</div>
          <div class='col-3'>When?</div>
        </div>
        <div class='row'>
          {this.props.tasks.map(function (task) {
            return <Task {... {data: task, actions: this.props.actions}} />
          }.bind(this))}
        </div>
      </div>
    )
  }
}
