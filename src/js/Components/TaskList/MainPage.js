import React from 'react'
import TaskList from './TaskList'
import Menu from './Menu'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TaskActions from '../../actions/TaskActions'

class TaskListMainPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }
  componentDidMount () {
    this.state.actions.loadTasks(this.state.user.token)
  }
  render () {
    return (
      <div className='task-list-container mh-s'>
        {
          this.props.tasks || this.props.errors ? <TaskList {...this.props} /> : null
        }
        <Menu {...{...this.state.actions, user: this.state.user}} />
      </div>
    )
  }
}

const mapStateToProps = state => ({tasks: state.tasks, ...state.errors, user: state.user})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...TaskActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListMainPage)
