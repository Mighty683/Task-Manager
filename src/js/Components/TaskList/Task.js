import React from 'react'
import TaskRow from './TaskRow'
import TaskEdit from './TaskEdit'
export default class Task extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props,
      isEditMode: false
    }
    this.onClick = this.onClick.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.getElement = this.getElement.bind(this)
  }

  onEdit (data) {
    this.state.actions.editTask(this.state.user.token, data)
    this.onClick()
  }

  onDelete (id) {
    this.state.actions.deleteTask(this.state.user.token, id)
  }

  onClick (e) {
    this.setState((prevState) => ({
      isEditMode: !prevState.isEditMode
    }))
  }

  getElement () {
    if (this.state.isEditMode) {
      return <TaskEdit {...{...this.state, onDelete: this.onDelete, onEditCancel: this.onClick, onEdit: this.onEdit}} />
    } else {
      return <TaskRow {...{...this.state.data, onClick: this.onClick}} />
    }
  }
  render () {
    return this.getElement()
  }
}
