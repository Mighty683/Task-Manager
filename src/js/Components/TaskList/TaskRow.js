import React from 'react'
const TaskRow = (props) => {
  function prepareFieldObj (value) {
    if (value) {
      if (value instanceof Date) {
        return value.toUTCString()
      }
      return value
    } else {
      return ''
    }
  }

  function getClass () {
    let today = new Date()
    if (!props.when) {
      return 'table-info'
    } else if ((props.when && props.when.getTime() < today.getTime()) && !props.done) {
      return 'table-danger'
    } else {
      return 'table-success'
    }
  }

  return (
    <tr className={getClass()} onClick={props.onClick}>
      <td>{prepareFieldObj(props.name)}</td>
      <td>{prepareFieldObj(props.desc)}</td>
      <td>{prepareFieldObj(props.where)}</td>
      <td>{prepareFieldObj(props.when)}</td>
    </tr>)
}
export default TaskRow
