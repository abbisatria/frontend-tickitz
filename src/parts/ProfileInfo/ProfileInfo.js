import React, { Component } from 'react'
import { Container, Row, Col, Tabs, Tab, Dropdown, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormInputText from '../../components/Form/FormInputText/FormInputText'
import FormInputNumber from '../../components/Form/FormInputNumber/FormInputNumber'
import FormInputPassword from '../../components/Form/FormInputPassword/FormInputPassword'
import Button from '../../components/Button/Button'
import http from '../../helpers/http'
import {connect} from 'react-redux'
import {updateProfile} from '../../redux/actions/auth'

import star from '../../assets/icon/eva_star-fill.png'

import './ProfileInfo.scss'

class ProfileInfo extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    message: '',
    file: null
  }
  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitData = async (event) => {
    event.preventDefault();
    const { firstname, lastname, email, phoneNumber, password, confirmPassword, file } = this.state
    if (password !== confirmPassword) {
      this.setState({
        message: 'New password and password confirmation do not match'
      })
    } else {
      const data = new FormData()
      if(firstname !== '') {
        data.append('firstname', firstname)
      } 
      if(lastname !== '') {
        data.append('lastname', lastname)
      } 
      if(phoneNumber !== '') {
        data.append('phoneNumber', phoneNumber)
      } 
      if(email !== '') {
        data.append('email', email)
      } 
      if(password !== '') {
        data.append('password', password)
      }
      if(file !== null) {
        data.append('image', file)
      }
      try {
        // const response = await http(this.props.token).patch(`users/updateProfile/${this.props.details.idUser}`, data)
        // this.setState({ message: response.data.message }, () => {
        //   this.props.update(response.data.results)
        // })
        const response = await http(this.props.token).patch(`users/updateProfile/${this.props.user.id}`, data)
        this.setState({ message: response.data.message }, () => {
          console.log(response.data.results)
          this.props.updateProfile(response.data.results)
        })
      } catch(err) {
        console.log(err)
        this.setState({ message: err.response.data.message })
      }
    }
  };
  render () {
    return (
      <div className="profile">
        <Container>
          <Row>
            <Col md={4}>
              <div className="card-info">
                <div className="info d-flex justify-content-between">
                  <h6>Info</h6>
                  <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                </div>
                {Object.keys(this.props.user).length > 0 && (
                  <div className="profile-info">
                    <img src={`http://localhost:5000/uploads/users/${this.props.user.image}`} alt="profile" />
                    <h3>{this.props.user.firstname} {this.props.user.lastname}</h3>
                    <p>Moviegoers</p>
                  </div>
                )}
                <hr />
                <div className="loyalty-points">
                  <h6>Loyalty Points</h6>
                  <div className="card-loyalty-points">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>Moviegoers</h5>
                      <img src={star} alt="icon star" />
                    </div>
                    <h4>
                      320 <span>points</span>
                    </h4>
                  </div>
                  <h4>180 points become a master</h4>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: 270 }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <div className="tab-bar">
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                  <Tab eventKey="home" title="Account Settings">
                  {this.state.message !== '' && <Alert variant="warning">{this.state.message}</Alert>}
                    <div className="tab-content">
                      <h3>Detail Information</h3>
                      <hr />
                      <Form onSubmit={this.submitData}>
                      <Form.Control onChange={(e)=>this.setState({file: e.target.files[0]})} type="file" />
                        <Row className="my-4">
                          <Col md={6} xs={12}>
                            <FormInputText
                              type="text"
                              name="firstname"
                              onChange={(event) => this.changeText(event)}
                              placeholder="Write your First Name"
                              defaultValue={this.props.user.firstname}
                            >
                              First Name
                            </FormInputText>
                          </Col>
                          <Col md={6} xs={12}>
                            <FormInputText
                              type="text"
                              name="lastname"
                              onChange={(event) => this.changeText(event)}
                              placeholder="Write your Last Name"
                              defaultValue={this.props.user.lastname}
                            >
                              Last Name
                            </FormInputText>
                          </Col>
                          <Col md={6} xs={12}>
                            <FormInputText
                              type="email"
                              name="email"
                              onChange={(event) => this.changeText(event)}
                              placeholder="Write your email"
                              defaultValue={this.props.user.email}
                            >
                              Email
                            </FormInputText>
                          </Col>
                          <Col md={6} xs={12}>
                            <FormInputNumber 
                            name="phoneNumber" 
                            onChange={(event) => this.changeText(event)}
                            defaultValue={this.props.user.phoneNumber}
                            >
                              Phone Number
                            </FormInputNumber>
                          </Col>
                        </Row>
                        <h3>Account and Privacy</h3>
                        <hr />
                        <Row>
                          <Col md={6} xs={12} className="my-1">
                            <FormInputPassword 
                            name="password" 
                            onChange={(event) => this.changeText(event)}
                            placeholder="Write your password">
                              New Password
                            </FormInputPassword>
                          </Col>
                          <Col md={6} xs={12} className="my-1">
                            <FormInputPassword 
                            name="confirmPassword"
                            onChange={(event) => this.changeText(event)} 
                            placeholder="Confirm your password">
                              Confirm Password
                            </FormInputPassword>
                          </Col>
                        </Row>
                        <Button className="btn-primary change py-2 px-5" type="submit">
                          Update Changes
                        </Button>
                      </Form>
                    </div>
                  </Tab>
                  <Tab eventKey="profile" title="Order History">
                    <div className="tab-content">
                      {Object.keys(this.props.order).length > 0 && this.props.order.map(item => {
                        return <div className="order-history">
                        <Row>
                          <Col md={8} xs={12} className="order-2 order-lg-1">
                            <p>{item.createdAt}</p>
                            <h6>{item.movie}</h6>
                          </Col>
                          <Col md={4} xs={12} className="order-1 order-lg-2">
                            <img src={`http://localhost:5000/uploads/cinemas/${item.image}`} alt={item.cinema} />
                          </Col>
                        </Row>
                        <hr />
                        <div className="ticket-order">
                          <Link to="/" className="ticket active py-2">
                            Ticket in active
                          </Link>
                          <Dropdown>
                            <Dropdown.Toggle variant id="dropdown-basic">
                              Show Details
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">
                                Action
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                Another action
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      })}
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  auth: state.auth
})
const mapDispatchToProps = {updateProfile}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)
