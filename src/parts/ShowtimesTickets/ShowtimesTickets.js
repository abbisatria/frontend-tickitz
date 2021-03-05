import React, { Component } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import FormInputDate from '../../components/Form/FormInputDate/FormInputDate'
import FormInputLocation from '../../components/Form/FormInputLocation/FormInputLocation'
import { Link } from 'react-router-dom'
import CardShowTimes from '../../components/CardShowTimes/CardShowTimes'
import load from '../../assets/icon/loading.svg'

import './ShowtimesTickets.scss'

import http from '../../helpers/http'

class ShowtimesTickets extends Component {
  state = {
    showtimesTickets: [],
    date: '',
    idMovie: Number(this.props.movieId),
    location: '',
    loading: false,
    message: ''
  };
  changeTime = (event) => {
    this.setState({ [event.target.name]: event.target.value, loading: true }, async () => {
      if (this.state.date !== '' && this.state.location !== '') {
        const { idMovie, date, location } = this.state
        const data = new URLSearchParams()
        data.append('idMovie', idMovie)
        data.append('date', date)
        data.append('search', location)
        try {
          const response = await http().post('showtimes/searchLocation', data)
          this.setState({
            loading: false,
            showtimesTickets: response.data.results,
            message: ''
          })
        } catch (err) {
          this.setState({
            showtimesTickets: '',
            message: err.response.data.message
          })
        }
      }
    })
  };
  // async componentDidUpdate(prevProps, prevState){
  //   const { idMovie, date, location } = this.state
  //   // console.log(`${prevState.date}, ${prevState.location} || ${date}, ${location}`)
  //   if((prevState.date && prevState.location) !== (date && location)) {
  //     const data = new URLSearchParams()
  //     data.append('idMovie', idMovie)
  //     data.append('date', date)
  //     data.append('search', location)
  //     try {
  //       const response = await http().post('showtimes/searchLocation', data)
  //       this.setState({
  //         showtimesTickets: response.data.results
  //       })
  //     } catch(err) {
  //       this.setState({
  //         showtimesTickets: ''
  //       })
  //       console.log(err.response.data.message)
  //     }
  //   }
  // }
  render () {
    return (
      <div className="showtimes-tickets">
        <Container>
          <h1>Showtimes and Tickets</h1>
          <Form className="form-showtimes my-5">
            <FormInputDate
              name="date"
              onChange={(event) => this.changeTime(event)}
            />
            <FormInputLocation data={this.changeTime}/>
          </Form>
          <Row>
            {this.state.message !== ''
              ? <Col className="d-flex justify-content-center align-items-center">{this.state.message}</Col>
              : this.state.loading
                ? <Col className="d-flex justify-content-center align-items-center"><img src={load} alt="loading" /></Col>
                : this.state.showtimesTickets.map((value, index) => {
                  return (
                <CardShowTimes
                  data={value}
                  date={this.state.date}
                  movieId={this.state.idMovie}
                  key={String(index)}
                />
                  )
                })}
          </Row>
          <h5>
            <Link to="/" className="view-more">
              View More
            </Link>
          </h5>
        </Container>
      </div>
    )
  }
}

export default ShowtimesTickets
