import React from 'react'
import { Form } from 'react-bootstrap'
import calender from '../../../assets/icon/ic_calendar.png'

import './FormInputTime.scss'

export default function FormInputTime (props) {
  const { name, onChange } = props
  return (
    <Form.Group>
      <div className="form-outline-time py-2">
        <img src={calender} alt="icon-calender" />
        <Form.Control
          name={name}
          type="time"
          className="unstyled"
          onChange={onChange}
        />
      </div>
    </Form.Group>
  )
}
