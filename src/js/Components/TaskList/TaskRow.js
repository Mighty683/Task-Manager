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
<<<<<<< HEAD
    } else if (props.when && props.when.getTime() < today.getTime() && props.canc) {
=======
    } else if ((props.when && props.when.getTime() < today.getTime() && props.canc) {
>>>>>>> 2b8cba87dd1d572f088a057d7948f1b581dc6f8b
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
