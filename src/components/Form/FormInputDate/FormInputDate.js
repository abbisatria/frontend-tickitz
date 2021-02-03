import React from 'react'
import { Form } from 'react-bootstrap'
import calender from '../../../assets/icon/ic_calendar.png'

import './FormInputDate.scss'

export default function FormInputDate (props) {
  const { name, onChange } = props
  return (
    <Form.Group>
      <div className="form-outline-date py-2">
        <img src={calender} alt="icon-calender" />
        <Form.Control
          name={name}
          type="date"
          className="unstyled"
          onChange={onChange}
        />
      </div>
    </Form.Group>
  )
}
