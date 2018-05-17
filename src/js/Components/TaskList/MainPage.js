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
    const isListPresent = this.props.tasks instanceof Object
    return (
      <div className='main-page mh-s'>
        {
          isListPresent ? <TaskList {...this.props} /> : null
        }
        <Menu {...this.props.actions} />
      </div>
    )
  }
}
const mapStateToProps = state => ({...state.actions})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TaskActions, dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListMainPage)
