import React from 'react'
import Task from './Task'
import { Row, Col } from 'reactstrap'
export default class TaskList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div class='container bg-black'>
        <Row class='bg-olive'>
          <Col xs='2'>Name</Col>
          <Col xs='4'>Description</Col>
          <Col xs='3'>Where?</Col>
          <Col xs='3'>When?</Col>
        </Row>
        <Row>
          {this.props.tasks.map(function (task) {
            return <Task {... {data: task, actions: this.props.actions}} />
          }.bind(this))}
        </Row>
      </div>
    )
  }
}
