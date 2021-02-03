import React from 'react'
import { Form } from 'react-bootstrap'

import './FormInputText.scss'

export default function FormInputText (props) {
  const { children, name, type, placeholder, onChange, defaultValue } = props
  return (
    <Form.Group>
      <Form.Label>{children}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        required
      />
    </Form.Group>
  )
}
