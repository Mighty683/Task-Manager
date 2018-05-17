import React from 'react'
export default class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({}, props)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleUpdate (e) {
    e.preventDefault()
    this.state.loadTasks()
  }

  handleAdd (e) {
    e.preventDefault()
    this.state.addTask()
  }

  render () {
    return (
      <div class='header-section text-center'>
        <h1 class='bg-teal mt-s page-header'>Task List</h1>
        <div class='btn-group mv-xxxs'>
          <div class='btn btn-primary' onClick={this.handleAdd}>Add Task</div>
          <div class='btn btn-primary' onClick={this.handleUpdate}>Update List</div>
        </div>
      </div>
    )
  }
}
