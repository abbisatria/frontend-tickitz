import React from 'react'
import { Form } from 'react-bootstrap'
import location from '../../../assets/icon/ic_location.png'

import './FormInputLocation.scss'

export default function FormInputLocation (props) {
  return (
    <Form.Group>
      <div className="form-outline-location">
        <img src={location} alt="icon-location" />
        <Form.Control as="select" custom className="form-select" name="location" onChange={(event) => props.data(event)}>
          <option>Location....</option>
          <option value="purwokerto">Purwokerto</option>
          <option value="jakarta">Jakarta</option>
          <option value="bandung">Bandung</option>
        </Form.Control>
      </div>
    </Form.Group>
  )
}
