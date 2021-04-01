import React from 'react'
import { Form, InputGroup, FormControl } from 'react-bootstrap'

export default function FormInputNumber (props) {
  const { children, className, defaultValue, name, onChange, onBlur } = props
  return (
    <>
      <Form.Label>{children}</Form.Label>
      <InputGroup className={className}>
        <InputGroup.Prepend>
          <InputGroup.Text>+62</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl type="number" name={name} onChange={onChange} placeholder="Write your phonenumber" defaultValue={defaultValue} onBlur={onBlur} />
      </InputGroup>
    </>
  )
}
