import React from 'react'
import TaskList from '../TaskList/TaskList'
import Menu from './Menu'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TaskActions from '../../actions'

class MainPage extends React.Component {
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
      <div class='main-page mh-s'>
        <Menu {...this.props.actions} />
        {
          isListPresent ? <TaskList {...this.props} /> : null
        }
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
)(MainPage)
