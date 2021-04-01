import React, { Component } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import CardMoviesUpcoming from '../../components/CardMoviesUpcoming/CardMoviesUpcoming'
import http from '../../helpers/http'

import './ComingMovies.scss'

class ComingMovies extends Component {
  state = {
    month: [
      {
        id: 9,
        month: 'September'
      },
      {
        id: 10,
        month: 'October'
      },
      {
        id: 11,
        month: 'November'
      },
      {
        id: 12,
        month: 'December'
      },
      {
        id: 1,
        month: 'January'
      },
      {
        id: 2,
        month: 'February'
      },
      {
        id: 3,
        month: 'March'
      },
      {
        id: 4,
        month: 'April'
      },
      {
        id: 5,
        month: 'May'
      },
      {
        id: 6,
        month: 'June'
      },
      {
        id: 7,
        month: 'July'
      },
      {
        id: 8,
        month: 'August'
      }
    ],
    movieUpComing: [],
    message: '',
    loading: false
  }

  async componentDidMount () {
    const response = await http().get('movies/upComing?order=DESC&limit=8')
    this.setState({
      movieUpComing: response.data.results
    })
  }

  monthUpComing = async (value) => {
    this.setState({ loading: true })
    const response = await http().get(`movies/upComing?month=${value}&order=DESC&limit=8`)
    if (response.data.results.length > 0) {
      this.setState({
        message: '',
        selectMonth: value,
        loading: false,
        movieUpComing: response.data.results
      })
    } else {
      this.setState({
        message: 'Movie Not Found',
        selectMonth: value,
        loading: false,
        movieUpComing: response.data.results
      })
    }
  }

  render () {
    return (
      <div className="upcoming-movies">
        <Container>
          <Row>
            <Col>
              <h2>Upcoming Movies</h2>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link
                to="/up-coming"
                className="view-all"
              >
                view all
              </Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="month-movies">
            {this.state.month.map((value, index) => {
              return (
                <Button
                  className="outline-primary"
                  key={String(index)}
                  onClick={() => this.monthUpComing(value.id)}
                >
                  {value.month}
                </Button>
              )
            })}
          </div>
          {this.state.loading ? <div className="d-flex justify-content-center align-items-center"><Spinner animation="border" /></div> : this.state.message !== '' ? <div className="d-flex justify-content-center align-items-center"><p>{this.state.message}</p></div> : null}
          <div className="movies-upcoming">
            {this.state.movieUpComing.length > 0
              ? this.state.movieUpComing.map((value, index) => {
                return <CardMoviesUpcoming data={value} key={String(index)} />
              })
              : null}
          </div>
        </Container>
      </div>
    )
  }
}

export default ComingMovies
