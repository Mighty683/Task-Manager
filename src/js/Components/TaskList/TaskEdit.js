import React from 'react'
import { Form,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap'
export default class TaskEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({}, props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.state.modal = false
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

  toggleModal () {
    this.setState((prevState) => ({
      modal: !prevState.modal
    }))
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
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
          <ModalHeader toggle={this.toggleModal}>Task Delete</ModalHeader>
          <ModalBody>
            Are you sure you want delete task?
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button color='danger' onClick={this.handleDelete}>Delete</Button>{' '}
              <Button color='secondary' onClick={this.toggleModal}>Cancel</Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
        <td>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for='name'>Name:</Label>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>Name</InputGroupText>
                </InputGroupAddon>
                <Input onChange={this.handleChange} id='name' type='text' placeholder={this.prepareFieldObj(this.state.data.name)} />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>Description</InputGroupText>
                </InputGroupAddon>
                <Input onChange={this.handleChange} id='desc' type='text' placeholder={this.prepareFieldObj(this.state.data.desc)} />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>Where</InputGroupText>
                </InputGroupAddon>
                <Input onChange={this.handleChange} id='where' type='text' placeholder={this.prepareFieldObj(this.state.data.where)} />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>Name</InputGroupText>
                </InputGroupAddon>
                <Input onChange={this.handleChange} id='name' type='text' placeholder={this.prepareFieldObj(this.state.data.name)} />
              </InputGroup>
              <FormGroup check>
                <Label for='done'><Input key={this.state.data.done} onClick={this.handleChange} defaultChecked={this.state.data.done} id='done' type='checkbox' /> Done?</Label>
              </FormGroup>
              <FormGroup>
                <Label for='when'>When:</Label>
                <Input type='date' id='when' onChange={this.handleChange} placeholder={this.prepareFieldObj(this.state.data.when)} />
              </FormGroup>
              <ButtonGroup>
                <Button id='submit' color='primary' type='submit'>Submit</Button>
                <Button id='cancel' color='secondary' onClick={this.handleCancel}>Cancel Edit</Button>
                <Button id='delete' color='danger' onClick={this.toggleModal}>Delete</Button>
              </ButtonGroup>
            </FormGroup>
          </Form>
        </td>
      </tr>
    )
  }
}
