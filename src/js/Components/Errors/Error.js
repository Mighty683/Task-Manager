import React from 'react'
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button
} from 'reactstrap'

const Error = (props) => {
  return (
    <Card body inverse color='danger'>
      <CardBody>
        <CardTitle>Error Occured!</CardTitle>
        <CardText>{props.msg}</CardText>
        {props.action && <Button onClick={props.action}>Try Again</Button>}
      </CardBody>
    </Card>
  )
}

export default Error
