import React from 'react'
import TaskRow from './TaskRow'
import TaskEdit from './TaskEdit'
export default class Task extends React.Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.state = {
      isEditMode: false,
      data: props.data,
      actions: props.actions
    }
  }

  onEdit (data) {
    this.state.actions.editTask(data)
    this.onClick()
  }

  onDelete (id) {
    this.state.actions.deleteTask(id)
  }

  onClick (e) {
    this.setState((prevState) => ({
      isEditMode: !prevState.isEditMode
    }))
  }
  render () { return (this.state.isEditMode ? <TaskEdit {...{...this.state, onDelete: this.onDelete, onEditCancel: this.onClick, onEdit: this.onEdit}} /> : <TaskRow {...{...this.state.data, onClick: this.onClick}} />) }
}
