import React from 'react'
import { Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserActions from '../../actions/UserActions'
import hashFun from '../../helpers/hashFun'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {...props}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    this.state.actions.login(this.state.user.login, hashFun(this.state.user.pass))
  }

  toggleModal (e) {
    e.preventDefault()
    this.state.actions.removeLoginError()
  }

  handleChange (e) {
    e.preventDefault()
    let id = e.target.id
    let value = e.target.value
    this.setState((prevState) => {
      prevState.user[id] = value
      return prevState
    })
  }

  render () {
    return <div className='login-container text-center'>
      <Modal isOpen={this.state.errors.login instanceof Object} toggle={this.toggleModal} >
        <ModalHeader toggle={this.toggleModal}>Login Failed</ModalHeader>
        <ModalBody>{this.state.errors.login && this.state.errors.login.msg}</ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={this.toggleModal}>Ok</Button>
        </ModalFooter>
      </Modal>
      <h2 className='card-header'>Welcome in Task Manager</h2>
      <div className='card-body'>
        <div className='card-text'>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for='login'>Email</Label>
              <Input type='text' name='login' id='login' placeholder='Login' onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for='pass'>Password</Label>
              <Input type='password' name='password' id='pass' placeholder='Password' onChange={this.handleChange} />
            </FormGroup>
            <Button id='submit' color='primary' type='submit'>Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({...state.tasks, ...state.errors, user: state.user})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...UserActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
