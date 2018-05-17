import React from 'react'
import TaskRow from './TaskRow'
import TaskEdit from './TaskEdit'
export default class Task extends React.Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.state = Object.assign({}, props)
  }

  onClick (e) {
    if (!this.state.data.isEditMode) {
      let data = this.state.data
      data.isEditMode = !data.isEditMode
      this.setState({data: data})
    }
  }

  render () { return (this.state.data.isEditMode ? <TaskEdit {...{...this.state, onClick: this.onClick}} /> : <TaskRow {...{...this.state.data, onClick: this.onClick}} />) }
}
