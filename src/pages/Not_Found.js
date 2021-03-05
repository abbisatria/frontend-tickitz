import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './NotFound.scss'

export default class NotFound extends Component {
  render () {
    return (
      <div className="page-not-found">
        <h1 className="status">404</h1>
        <p className="description">PAGE NOT FOUND</p>
        <Link to="/" className="btn btn-outline-primary">Back to Home</Link>
      </div>
    )
  }
}
