import React, { Component } from 'react'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import TaskListMainPage from '../TaskList/MainPage.js'
import Welcome from './Welcome.js'
import NavBar from './NavBar.js'

class MainPage extends Component {
  constructor (props) {
    super()
    this.state = {
      ...props
    }
    this.handleContinue = this.handleContinue.bind(this)
    this.handleDataChange = this.handleDataChange.bind(this)
  }

  handleContinue () {
    this.props.history.push('/tasks')
  }

  handleDataChange (preparedData) {
    this.setState({
      ...preparedData
    })
    this.props.history.push('/adminpanel')
  }

  render () {
    return (
      <AlertProvider template={AlertTemplate} {... {
        position: 'bottom center',
        timeout: 3000,
        transtition: 'scale',
        offset: '30px'
      }}>
        <div className='main container text-center'>
          <header>
            <h1>Task-Manager</h1>
            <NavBar />
          </header>
          <Switch>
            <Route exact path='/' render={() => (
              <Welcome handleContinue={this.handleContinue} />
            )} />
            <Route path='/tasks' render={() => (
              <TaskListMainPage {...this.state} />
            )} />
            <Route path='/adminpanel' render={() => (
              <div>TO DO</div>
            )} />
          </Switch>
          <footer className='text-muted'>Made by Tomasz Szarek 2018</footer>
        </div>
      </AlertProvider>)
  }
}

export default withRouter(MainPage)
