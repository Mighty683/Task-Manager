import React from 'react'
import { Button } from 'reactstrap'

const Welcome = ({handleContinue}) => {
  return (
    <div className='welcome card text-center'>
      <h2 className='card-header'>Welcome in Task Manager</h2>
      <div className='card-body'>
        <div className='card-text'>
          <p>Application for task storage and manage</p>
          <p>Press Continue.</p>
          <div className='form-group'>
            <Button color='primary' onClick={handleContinue}>Continue</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
