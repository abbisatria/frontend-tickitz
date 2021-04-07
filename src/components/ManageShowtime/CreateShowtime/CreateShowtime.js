import React, { Component } from 'react'
import { Row, Col, Form, Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { cinemaLocation, createShowtime } from '../../../redux/actions/showtime'

import { withRouter } from 'react-router-dom'

import FormInputLocation from '../../Form/FormInputLocation/FormInputLocation'
import FormInputTime from '../../Form/FormInputTime/FormInputTime'
import Button from '../../Button/Button'
import FormInputText from '../../Form/FormInputText/FormInputText'
import Select from 'react-select'
import moment from 'moment'

const { REACT_APP_API_URL: URL } = process.env

class CreateShowtime extends Component {
  state = {
    time: '',
    selectTime: [],
    selectCinema: [],
    cinema: [],
    location: '',
    date: '',
    movie: null,
    message: '',
    loading: false
  }

  options = this.props.movie.results.map(item => {
    return { label: item.name, value: item.id }
  })

  selectedTime = (id) => {
    const { selectTime } = this.state
    if (id) {
      selectTime.push(id)
      this.setState({
        selectTime: selectTime
      })
    }
  }

  deleteTime = (id) => {
    const { selectTime } = this.state
    let newArray = []
    newArray = selectTime.filter((item) => item !== id)
    this.setState({
      selectTime: newArray
    })
  }

  selectedCinema = (id) => {
    const { selectCinema } = this.state
    let newArray = []
    if (selectCinema.indexOf(id) === -1) {
      selectCinema.push(id)
      newArray = selectCinema
    } else {
      newArray = selectCinema.filter((item) => item !== id)
    }
    this.setState({
      selectCinema: newArray
    })
  };

  onChangeInput = (value) => {
    this.setState({
      movie: value
    })
  }

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value }, async () => {
      if (this.state.location !== '') {
        const { location } = this.state
        await this.props.cinemaLocation(location)
        this.setState({ message: 'Berhasil' })
      }
    })
  };

  submitData = async (event) => {
    this.setState({ loading: true })
    event.preventDefault()
    const { movie, date, selectCinema, selectTime } = this.state
    if (movie && date && selectTime && selectCinema) {
      await this.props.createShowtime(this.props.auth.token, movie.value, date, selectCinema, selectTime)
      if (this.props.showtime.success === true) {
        this.props.history.push('/admin/manage_movie')
      } else {
        this.setState({ message: this.props.showtime.errorMsg, loading: false })
      }
    } else {
      this.setState({ message: 'all forms are required', loading: false })
    }
  };

  render () {
    return (
      <>
      <Form onSubmit={this.submitData}>
      <h1>Create Showtime</h1>
      {this.state.message !== '' && this.state.message !== 'Berhasil' && <Alert variant="danger">{this.state.message}</Alert>}
        <Row>
          <Col md={6}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Movie</Form.Label>
              {Object.keys(this.options).length > 0 && <Select name="movie" options={this.options} onChange={this.onChangeInput} placeholder="Select your movie" />}
            </Form.Group>
          </Col>
          <Col md={6}>
            <FormInputText
                type="date"
                name="date"
                onChange={(event) => this.changeText(event)}
              >
                Showtime Date
            </FormInputText>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormInputLocation data={this.changeText} />
            <Row>
              <Col md={12}>
                <Row>
                  {(this.state.message !== '' && this.state.message === 'Berhasil' && this.props.showtime.errorMsg === '') && this.props.showtime.results.map((item, index) => {
                    return (
                      <Col md={4} xs={4} key={String(index)}>
                        <label>
                          <input type="checkbox" name="cinema" onClick={() => this.selectedCinema(item.id)} />
                          <div className="cinema">
                            <img src={`${URL}uploads/cinemas/${item.image}`} alt={item.name} />
                          </div>
                        </label>
                      </Col>
                    )
                  })}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <FormInputTime name="time" onChange={(event) => this.changeText(event)} />
            <Row>
            <Col md={12}>
              <Row>
                <Col md={3} xs={3}>
                  <div className="outline-primary d-flex justify-content-center py-1" onClick={() => this.selectedTime(this.state.time)}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </div>
                </Col>
                {this.state.selectTime && this.state.selectTime.map((item, index) => {
                  return (
                    <Col md={3} xs={3} key={String(index)}>
                      <div className="d-flex align-items-center">
                        <p>{moment(item, 'HH:mm:ss').format('hh:mmA')}</p>
                        <i className="fa fa-window-close" aria-hidden="true" onClick={() => this.deleteTime(item)}></i>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </Col>
          </Row>
          </Col>
        </Row>
        {this.state.loading ? <Spinner animation="border" /> : <Button className="btn btn-primary" type="submit">Save</Button>}
      </Form>
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  showtime: state.showtime,
  movie: state.movie
})

const mapDispatchToProps = { cinemaLocation, createShowtime }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateShowtime))
