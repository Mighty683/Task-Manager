import React, { Component } from 'react'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Route } from 'react-router-dom'
import TaskListMainPage from '../TaskList/MainPage.js'
import Login from './Login.js'
import NavBar from './NavBar.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserActions from '../../actions/UserActions'

class MainPage extends Component {
  constructor (props) {
    super()
    this.state = {
      ...props
    }
    this.handleContinue = this.handleContinue.bind(this)
    this.handleAdminPanel = this.handleAdminPanel.bind(this)
    this.logout = this.logout.bind(this)
  }

  logout () {
    this.state.actions.logout(this.props.user.token)
  }

  handleContinue () {
    this.props.history.push('/tasks')
  }

  handleAdminPanel (preparedData) {
    this.props.history.push('/adminpanel')
  }

  render () {
    return (
      <div className='main-container text-center'>
        <header>
          <h1>Task-Manager</h1>
          <NavBar {...{goToTasks: this.handleContinue,
            goToAdminPanel: this.handleAdminPanel,
            logout: this.logout}} />
        </header>
        <Route exact path='/' render={() => {
          return this.props.user.token
            ? <TaskListMainPage {...this.props} />
            : <Login {...{...this.props}} />
        }} />
        <Route path='/tasks' render={() => (
          <TaskListMainPage {...this.state} />
        )} />
        <Route path='/adminpanel' render={() => (
          <div>TO DO</div>
        )} />
        <AlertProvider template={AlertTemplate} {... {
          position: 'bottom center',
          timeout: 3000,
          transtition: 'scale',
          offset: '30px'
        }} />
        <footer className='text-muted'>Made by Tomasz Szarek 2018</footer>
      </div>
    )
  }
}

const mapStateToProps = state => ({user: state.user})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...UserActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)
