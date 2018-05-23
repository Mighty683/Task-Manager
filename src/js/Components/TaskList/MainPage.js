import React from 'react'
import TaskList from './TaskList'
import Menu from './Menu'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TaskActions from '../../actions'

class TaskListMainPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  componentDidMount () {
    this.state.actions.loadTasks()
  }

  render () {
    console.log(this)
    return (
      <div className='main-page mh-s'>
        {
          this.props.tasks || this.props.errors ? <TaskList {...this.props} /> : null
        }
        <Menu {...this.props.actions} />
      </div>
    )
  }
}

const mapStateToProps = state => ({...state.tasks, ...state.errors})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TaskActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListMainPage)
