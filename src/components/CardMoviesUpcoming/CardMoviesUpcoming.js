import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './CardMoviesUpcoming.scss'

const { REACT_APP_API_URL: URL } = process.env

export default class CardMoviesUpcoming extends Component {
  render () {
    return (
      <div className="card-movies-upcoming">
        <img src={`${URL}uploads/movies/${this.props.data.image}`} alt={this.props.data.name} />
        <h1>{this.props.data.name}</h1>
        <p>{this.props.data.genre}</p>
        <Link to={`/details/${this.props.data.id}`} className="btn-details">
          Details
        </Link>
      </div>
    )
  }
}
