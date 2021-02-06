import React, { Component } from "react";
import Moment from "react-moment";
import { Container, Row, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import FormInputText from "../../components/Form/FormInputText/FormInputText";
import Button from "../../components/Button/Button";
import FormInputNumber from "../../components/Form/FormInputNumber/FormInputNumber";
// import http from '../../helpers/http'
import {connect} from 'react-redux'
import {checkOut} from '../../redux/actions/order'

import "./PaymentInfo.scss";

import google from "../../assets/icon/ic_google_pay.png";
import visa from "../../assets/icon/ic_visa.png";
import gopay from "../../assets/icon/ic_gopay.png";
import paypal from "../../assets/icon/ic_paypal.png";
import dana from "../../assets/icon/ic_dana.png";
import bca from "../../assets/icon/ic_bca.png";
import bri from "../../assets/icon/ic_bri.png";
import ovo from "../../assets/icon/ic_ovo.png";

class PaymentInfo extends Component {
  payOrder = async (movieId, cinemaId, showtimesId, seat, token) => {
    await this.props.checkOut(movieId, cinemaId, showtimesId, seat, token)
    this.props.history.push(`/ticket/${this.props.order.resultsCheckOut[0].id}`)
    // const data = new URLSearchParams()
    // data.append('idMovie', movieId)
    // data.append('idCinema', cinemaId)
    // data.append('idShowtime', showtimesId)
    // seat.map(item => data.append('seat', item))
    // try {
    //   const response = await http(token).post('transaction', data)
    //   this.props.history.push('/ticket', {
    //     data: response.data.results
    //   })
    // } catch(err) {
    //   console.log(err.response.data.message)
    // }
  };
  render() {
    return (
      <div className="payment">
        <Container>
          <Row>
            <Col md={8}>
              <div className="payment-info">
                <h2 className="d-none d-md-block">Payment Info</h2>
                <div className="card-payment-info">
                  <div className="d-none d-md-block">
                    <Row>
                      <Col md={4}>
                        <p>Date & time</p>
                      </Col>
                      <Col md={8}>
                        <h6>
                          <Moment format="dddd, D MMMM YYYY">
                          {this.props.showtime.showtimeDate}
                          </Moment>{" "}
                          at {this.props.showtime.showtime}
                        </h6>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={4}>
                        <p>Movie title</p>
                      </Col>
                      <Col md={8}>
                        <h6>{this.props.showtime.movie}</h6>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={4}>
                        <p>Cinema name</p>
                      </Col>
                      <Col md={8}>
                        <h6>{this.props.showtime.cinema} Cinema</h6>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={4}>
                        <p>Number of tickets</p>
                      </Col>
                      <Col md={8}>
                        <h6>{this.props.seat.join(',').split(',').length} pieces</h6>
                      </Col>
                    </Row>
                    <hr />
                  </div>
                  <Row>
                    <Col md={7} xs={7}>
                      <p>Total payment</p>
                    </Col>
                    <Col md={5} xs={5}>
                      <h5>
                        ${this.props.seat.join(',').split(',').length * this.props.showtime.price},00
                      </h5>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="payment-method">
                <h2>Choose a Payment Method</h2>
                <div className="card-payment-method">
                  <Row>
                    <Col md={3} xs={3}>
                      <label>
                        <input type="radio" name="payment" />
                        <div className="icon-payment">
                          <img src={google} alt="ic google" />
                        </div>
                      </label>
                    </Col>
                    <Col md={3} xs={3}>
                      <label>
                        <input type="radio" name="payment" />
                        <div className="icon-payment">
                          <img src={visa} alt="ic visa" />
                        </div>
                      </label>
                    </Col>
                    <Col md={3} xs={3}>
                      <label>
                        <input type="radio" name="payment" />
                        <div className="icon-payment">
                          <img src={gopay} alt="ic gopay" />
                        </div>
                      </label>
                    </Col>
                    <Col md={3} xs={3}>
                      <label>
                        <input type="radio" name="payment" />
                        <div className="icon-payment">
                          <img src={paypal} alt="ic paypal" />
                        </div>
                      </label>
                    </Col>
                    <Col md={3} xs={3}>
                      <label>
                        <input type="radio" name="payment" />
                        <div className="icon-payment">
                          <img src={dana} alt="ic dana" />
                        </div>
                      </label>
                    </Col>
                    <Col md={3} xs={3}>
                      <label>
                        <input type="radio" name="payment" />
                        <div className="icon-payment">
                          <img src={bca} alt="ic bca" />
                        </div>
                      </label>
                    </Col>
                    <Col md={3} xs={3}>
                      <label>
                        <input type="radio" name="payment" />
                        <div className="icon-payment">
                          <img src={bri} alt="ic bri" />
                        </div>
                      </label>
                    </Col>
                    <Col md={3} xs={3}>
                      <label>
                        <input type="radio" name="payment" />
                        <div className="icon-payment">
                          <img src={ovo} alt="ic ovo" />
                        </div>
                      </label>
                    </Col>
                  </Row>
                  <h6>
                    <span>or</span>
                  </h6>
                  <div className="pay-cash">
                    Pay via cash.
                    <Link to="#/">See how it work</Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="personal-info">
                <h2>Personal Info</h2>
                <div className="card-personal-info">
                  <FormInputText
                    name="fullname"
                    type="text"
                    placeholder="Write your Full Name"
                    defaultValue={this.props.user.firstname}
                  >
                    Full Name
                  </FormInputText>
                  <FormInputText
                    name="email"
                    type="email"
                    placeholder="Write your email"
                    defaultValue={this.props.user.email}
                  >
                    Email
                  </FormInputText>
                  <FormInputNumber className="mb-4" defaultValue={this.props.user.phoneNumber}>
                    Phone Number
                  </FormInputNumber>
                  <div className="alert alert-warning" role="alert">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    Fill your data correctly.
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={8}>
              <Row>
                <Col className="d-none d-md-block">
                  <Link to="/" className="btn btn-previous py-3 w-100">
                    Previous step
                  </Link>
                </Col>
                <Col>
                  <Button
                    onClick={() =>
                      this.payOrder(
                        this.props.showtime.idMovie,
                        this.props.showtime.idCinema,
                        this.props.showtime.id,
                        this.props.seat,
                        this.props.token
                      )
                    }
                    className="btn-primary py-3 w-100"
                  >
                    Pay your order
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  order: state.order
})
const mapDispatchToProps = {checkOut}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PaymentInfo));
