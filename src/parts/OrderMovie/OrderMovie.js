import React, { Component } from 'react'
import Moment from 'react-moment'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import Button from '../../components/Button/Button'

import Seat from '../../components/Seat/Seat'
import { connect } from 'react-redux'
import { seatChecked } from '../../redux/actions/order'

import './OrderMovie.scss'

const { REACT_APP_API_URL: URL } = process.env

class OrderMovie extends Component {
  state = {
    seat: []
  };
  selectSeat = (id) => {
    const { seat } = this.state
    let newArray = []
    if (seat.indexOf(id) === -1) {
      seat.push(id)
      newArray = seat
    } else {
      newArray = seat.filter((item) => item !== id)
    }
    this.setState({
      seat: newArray
    })
  };
  checkOut = () => {
    this.props.seatChecked(this.state.seat)
    this.props.history.push('/payment')
  };
  render () {
    return (
      <div className="order-movie">
        <Container>
          <Row>
            <Col md={8}>
              <div className="movie-selected d-none d-md-block">
                <h2>Movie Selected</h2>
                <div className="card-movie-selected d-flex justify-content-between align-items-center">
                  <h3>{this.props.showtime.movie}</h3>
                  <Link to="/" className="btn-change-movie px-3 py-2">
                    Change movie
                  </Link>
                </div>
              </div>
              <div className="choose-your-seat">
                <h2>Choose Your Seat</h2>
                <div className="card-seat">
                  <h5>Screen</h5>
                  <hr />
                  <Seat data={this.selectSeat} soldSeat={this.props.seat}/>
                  <div className="seating-key">
                    <h4>Seating key</h4>
                    <Row>
                      <Col xs={1} className="d-sm-block d-md-none">
                        <i className="fa fa-arrow-down" aria-hidden="true"></i>
                      </Col>
                      <Col xs={5} className="d-sm-block d-md-none">
                        <p>A - G</p>
                      </Col>
                      <Col xs={1} className="d-sm-block d-md-none">
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                      </Col>
                      <Col xs={5} className="d-sm-block d-md-none">
                        <p>1 - 14</p>
                      </Col>
                      <Col md={1} xs={1}>
                        <div className="available"></div>
                      </Col>
                      <Col md={2} xs={5}>
                        <p>Available</p>
                      </Col>
                      <Col md={1} xs={1}>
                        <div className="selected"></div>
                      </Col>
                      <Col md={2} xs={5}>
                        <p>Selected</p>
                      </Col>
                      <Col md={1} xs={1}>
                        <div className="love-nest"></div>
                      </Col>
                      <Col md={2} xs={5}>
                        <p>Love nest</p>
                      </Col>
                      <Col md={1} xs={1}>
                        <div className="sold"></div>
                      </Col>
                      <Col md={2} xs={5}>
                        <p>Sold</p>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="d-md-none d-sm-block">
                  <div className="card-choosed d-flex justify-content-between align-items-center">
                    <h6>Choosed</h6>
                    <h5>{this.state.seat.join(', ')}</h5>
                  </div>
                </div>
                <Row className="my-4">
                  <Col className="d-none d-md-block">
                    <Link to="/" className="btn btn-your-movie py-3 w-100">
                      Change your movie
                    </Link>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button
                      className="btn-primary py-3 w-100"
                      onClick={() =>
                        this.checkOut()
                      }
                    >
                      Checkout now
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={4} className="d-none d-md-block">
              <div className="order-info">
                <h2>Order Info</h2>
                <div className="card-order-info">
                  <div className="cinema">
                    <img src={`${URL}uploads/cinemas/${this.props.showtime.image}`} alt="" />
                    <h2>{this.props.showtime.cinema}</h2>
                  </div>
                  <div className="detail-order">
                    <div className="d-flex justify-content-between">
                      <p>Movie selected</p>
                      <h6>{this.props.showtime.movie}</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>
                        <Moment format="dddd, D MMMM YYYY">
                          {this.props.showtime.showtimeDate}
                        </Moment>
                      </p>
                      <h6>
                          {this.props.showtime.showtime}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>One ticket price</p>
                      <h6>${this.props.showtime.price}</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Seat choosed</p>
                      <h6>{this.state.seat.join(', ')}</h6>
                    </div>
                  </div>
                  <hr />
                  <div className="total-payment">
                    <div className="d-flex justify-content-between">
                      <h4>Total Payment</h4>
                      <h3>
                        ${(this.state.seat.includes('F11, F12')) ? (this.state.seat.length + 1) * this.props.showtime.price : this.state.seat.length * this.props.showtime.price}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order
})
const mapDispatchToProps = { seatChecked }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderMovie))
