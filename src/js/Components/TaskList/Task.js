import React from 'react'
import TaskRow from './TaskRow'
import TaskEdit from './TaskEdit'
import { Col } from 'reactstrap'
export default class Task extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({}, props)
  }

  render () {
    let isEditMode = this.state.data.isEditMode
    return (
      <Col xs='12 bordered' onClick={(e) => {
        if (!isEditMode) {
          let data = this.state.data
          data.isEditMode = !data.isEditMode
          this.setState({data: data})
        }
      }}>
        {
          isEditMode
            ? <TaskEdit {...this.state} />
            : <TaskRow {...this.state.data} />
        }
      </Col>
    )
  }
}
