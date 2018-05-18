import React from 'react'
import { Form, FormGroup, Label, Input, Button, ButtonGroup } from 'reactstrap'
export default class TaskEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({}, props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  prepareFieldObj (value) {
    return value || ''
  }

  handleChange (e) {
    e.preventDefault()
    let id = e.target.id
    let value
    if (id === 'when') {
      value = new Date(e.target.value)
    } else if (id === 'done') {
      value = e.target.checked
    } else {
      value = e.target.value
    }
    this.setState((prevState) => {
      prevState.data[id] = value
      return prevState
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.state.onEdit(this.state.data)
  }

  handleCancel (e) {
    e.preventDefault()
    this.state.onEditCancel(this.state.data.id)
  }

  handleDelete (e) {
    e.preventDefault()
    this.state.onDelete(this.state.data.id)
  }

  render () {
    return (
      <tr>
        <td>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for='name'>Name:</Label>
              <Input onChange={this.handleChange} id='name' type='text' placeholder={this.prepareFieldObj(this.state.data.name)} />

              <Label for='desc'>Description:</Label>
              <Input onChange={this.handleChange} id='desc' type='text' placeholder={this.prepareFieldObj(this.state.data.desc)} />

              <Label for='where'>Where:</Label>
              <Input onChange={this.handleChange} id='where' type='text' placeholder={this.prepareFieldObj(this.state.data.where)} />

              <FormGroup check>
                <Label for='done'><Input key={this.state.data.done} onClick={this.handleChange} defaultChecked={this.state.data.done} id='done' type='checkbox' /> Done?</Label>
              </FormGroup>
              <Label for='when'>When:</Label>
              <ButtonGroup>
                <Button id='submit' color='primary' type='submit'>Submit</Button>
                <Button id='cancel' color='secondary' onClick={this.handleCancel}>Cancel Edit</Button>
                <Button id='delete' color='danger' onClick={this.handleDelete}>Delete</Button>
              </ButtonGroup>
            </FormGroup>
          </Form>
        </td>
      </tr>
    )
  }
}
