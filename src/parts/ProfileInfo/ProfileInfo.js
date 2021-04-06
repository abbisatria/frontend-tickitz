import React, { Component } from 'react'
import { Container, Row, Col, Tabs, Tab, Form, Alert, Spinner } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import FormInputText from '../../components/Form/FormInputText/FormInputText'
import FormInputNumber from '../../components/Form/FormInputNumber/FormInputNumber'
import FormInputPassword from '../../components/Form/FormInputPassword/FormInputPassword'
import Button from '../../components/Button/Button'
import { connect } from 'react-redux'
import { updateProfile } from '../../redux/actions/auth'
import { detailTicket } from '../../redux/actions/order'

import star from '../../assets/icon/eva_star-fill.png'
import avatar from '../../assets/icon/default-avatar.png'

import { Formik } from 'formik'
import * as Yup from 'yup'

import './ProfileInfo.scss'

const { REACT_APP_API_URL: URL } = process.env

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, '*First Name must have at least 2 characters')
    .max(50, '*First name must be less than 50 characters')
    .required('*First name is required'),
  lastName: Yup.string()
    .max(50, '*Last name must be less than 50 characters')
    .notRequired(),
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 100 characters')
    .required('*Email is required'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('*Phone number is required')
})

class ProfileInfo extends Component {
  state = {
    message: '',
    loading: false,
    loadingPhoto: false,
    show: false,
    alert: ''
  }
  passwordValidation (values) {
    const errors = {}
    const { password, confirmPassword } = values

    if (!password) {
      errors.msg = 'New Password Required'
    } else if (!confirmPassword) {
      errors.msg = 'Repeat your new password'
    } else if (password.length < 8 || confirmPassword.length < 8) {
      errors.msg = 'Password have at least 8 characters'
    } else if (password !== confirmPassword) {
      errors.msg = 'New password & repeat password not same'
    }
    return errors
  }
  submitData = async (values) => {
    this.setState({ loading: true })
    const { token } = this.props.auth
    const { id } = this.props.user
    const { firstName, lastName, email, phoneNumber } = values
    await this.props.updateProfile(token, id, {
      firstname: firstName,
      lastname: lastName || ' ',
      email: email,
      phoneNumber: phoneNumber
    })
    if (this.props.auth.errorMsg === '') {
      this.setState({ loading: false, message: this.props.auth.message, alert: 'success', show: true })
    } else {
      this.setState({ loading: false, message: this.props.auth.errorMsg, alert: 'danger', show: true })
    }
  };
  updatePassword = async (values) => {
    this.setState({ loading: true })
    const { token } = this.props.auth
    const { id } = this.props.user
    const { password } = values
    await this.props.updateProfile(token, id, {
      password: password
    })
    this.setState({ loading: false, message: this.props.auth.message, alert: 'success', show: true })
  };
  ticketDetail = async (id) => {
    await this.props.detailTicket(this.props.token, id)
    this.props.history.push(`/ticket/${id}`)
  }
  updatePhoto = async (event) => {
    this.setState({ loadingPhoto: true })
    const { token } = this.props.auth
    const { id } = this.props.user
    await this.props.updateProfile(token, id, { file: event.target.files[0] })
    if (this.props.auth.errorMsg === '') {
      this.setState({ loadingPhoto: false, message: this.props.auth.message, alert: 'success', show: true })
    } else {
      this.setState({ loadingPhoto: false, message: this.props.auth.errorMsg, alert: 'danger', show: true })
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
                     <label className="upload-profile">
                        <input onChange={(e) => this.updatePhoto(e)} type="file" />
                        <div className="image-profile">
                          <img src={this.props.user.image && this.props.user.image !== 'null' ? `${URL}uploads/users/${this.props.user.image}` : avatar} alt="profile" />
                        </div>
                      </label>
                    {this.state.loadingPhoto && <Spinner animation="border" />}
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
                  {this.state.message !== '' && this.state.show && <Alert variant={this.state.alert} onClose={() => this.setState({ show: false })} dismissible>{this.state.message}</Alert>}
                    <div className="tab-content">
                      <h3>Detail Information</h3>
                      <hr />
                      <Formik
                      initialValues={{
                        firstName: this.props.user.firstname || '',
                        lastName: this.props.user.lastname || '',
                        email: this.props.user.email || '',
                        phoneNumber: this.props.user.phoneNumber || ''
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(values) => this.submitData(values)}>
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isValid
                        }) => (
                          <Form onSubmit={handleSubmit}>
                            <Row className="my-4">
                              <Col md={6} xs={12}>
                                <FormInputText
                                  type="text"
                                  name="firstName"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Write your First Name"
                                  defaultValue={values.firstName}
                                  error={touched.firstName && errors.firstName
                                    ? (<div className="error-message" style={{ color: 'red' }}>{errors.firstName}</div>)
                                    : null}
                                >
                                  First Name
                                </FormInputText>
                              </Col>
                              <Col md={6} xs={12}>
                                <FormInputText
                                  type="text"
                                  name="lastName"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Write your Last Name"
                                  defaultValue={values.lastName}
                                  error={touched.lastName && errors.lastName
                                    ? (<div className="error-message" style={{ color: 'red' }}>{errors.lastName}</div>)
                                    : null}
                                >
                                  Last Name
                                </FormInputText>
                              </Col>
                              <Col md={6} xs={12}>
                                <FormInputText
                                  type="email"
                                  name="email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Write your email"
                                  defaultValue={values.email}
                                  error={touched.email && errors.email
                                    ? (<div className="error-message" style={{ color: 'red' }}>{errors.email}</div>)
                                    : null}
                                >
                                  Email
                                </FormInputText>
                              </Col>
                              <Col md={6} xs={12}>
                                <FormInputNumber
                                name="phoneNumber"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.phoneNumber}
                                >
                                  Phone Number
                                </FormInputNumber>
                                {touched.phoneNumber && errors.phoneNumber
                                  ? (<div className="error-message" style={{ color: 'red' }}>{errors.phoneNumber}</div>)
                                  : null}
                              </Col>
                              <Col>
                                {this.state.loading
                                  ? <Spinner animation="border" />
                                  : <Button className={!isValid ? 'btn-disabled change py-2 px-5' : 'btn-primary change py-2 px-5'} type="submit" disabled={!isValid}>
                                  Update Changes
                                </Button>}
                              </Col>
                            </Row>
                          </Form>
                        )}
                      </Formik>
                      <Formik
                      validate={this.passwordValidation}
                      initialValues={{
                        password: '',
                        confirmPassword: ''
                      }}
                      onSubmit={(values, { resetForm }) => {
                        this.updatePassword(values)
                        resetForm()
                      }}>
                        {({
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          values,
                          errors
                        }) => (
                          <Form onSubmit={handleSubmit}>
                            <h3>Account and Privacy</h3>
                            <hr />
                            <Row>
                              <Col md={6} xs={12} className="my-1">
                                <FormInputPassword
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.password}
                                placeholder="Write your password">
                                  New Password
                                </FormInputPassword>
                              </Col>
                              <Col md={6} xs={12} className="my-1">
                                <FormInputPassword
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.confirmPassword}
                                placeholder="Confirm your password">
                                  Confirm Password
                                </FormInputPassword>
                              </Col>
                              <Col>
                              {errors.msg
                                ? (<div className="error-message" style={{ color: 'red' }}>{errors.msg}</div>)
                                : null}
                              </Col>
                            </Row>
                            {this.state.loading
                              ? <Spinner animation="border" />
                              : <Button className={values.password === '' ||
                                  values.confirmPassword === '' ||
                                  errors.msg
                                ? 'btn-disabled change py-2 px-5'
                                : 'btn-primary change py-2 px-5'} type="submit" disabled={!!(values.password === '' ||
                                  values.confirmPassword === '' ||
                                  errors.msg)}>
                                  Update Password
                                </Button>}
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Tab>
                  <Tab eventKey="profile" title="Order History">
                    <div className="tab-content">
                      {Object.keys(this.props.order).length > 0 && this.props.order.map(item => {
                        return <div className="order-history" key={String(item.id)}>
                        <Row>
                          <Col md={8} xs={12} className="order-2 order-lg-1">
                            <p>{item.createdAt}</p>
                            <h6>{item.movie}</h6>
                          </Col>
                          <Col md={4} xs={12} className="order-1 order-lg-2">
                            <img src={`${URL}uploads/cinemas/${item.image}`} alt={item.cinema} />
                          </Col>
                        </Row>
                        <hr />
                        <div className="ticket-order">
                          <Link to="/" className="ticket active py-2">
                            Ticket in active
                          </Link>
                          <button onClick={() =>
                            this.ticketDetail(item.id)
                            }>
                            Show Details
                          </button>
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

const mapStateToProps = state => ({
  auth: state.auth
})
const mapDispatchToProps = { updateProfile, detailTicket }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileInfo))
