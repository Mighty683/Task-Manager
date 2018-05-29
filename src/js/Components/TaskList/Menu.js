import React from 'react'
import { Button } from 'reactstrap'
export default class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({}, props)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleUpdate (e) {
    e.preventDefault()
    this.state.loadTasks(this.state.user.token)
  }

  handleAdd (e) {
    e.preventDefault()
    this.state.addTask(this.state.user.token)
  }

  render () {
    return (
      <div className='header-section text-center'>
        <h1 className='bg-teal mt-s page-header'>Task List</h1>
        <div className='btn-group mv-xxxs'>
          <Button color='primary' onClick={this.handleAdd}>Add Task</Button>
          <Button color='primary' onClick={this.handleUpdate}>Update List</Button>
        </div>
      </div>
    )
  }
}
