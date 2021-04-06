import React, { Component } from 'react'
import { Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap'
import Button from '../../../components/Button/Button'
import FormInputText from '../../../components/Form/FormInputText/FormInputText'
import FormInputPassword from '../../../components/Form/FormInputPassword/FormInputPassword'
import http from '../../../helpers/http'

import logo from '../../../assets/images/logo-tickitz.png'

import '../auth.scss'

class ForgotPassword extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    loading: false,
    alert: '',
    show: false
  }
  forgotPassword = async (event) => {
    this.setState({ loading: true })
    event.preventDefault()
    const { email } = this.state
    const data = new URLSearchParams()
    data.append('email', email)
    try {
      const response = await http().post('auth/forgotPassword', data)
      this.setState({ message: response.data.message, loading: false, alert: 'success', show: true })
    } catch (err) {
      this.setState({ message: err.response.data.message, loading: false, alert: 'danger', show: true })
    }
  };
  resetPassword = async (event) => {
    this.setState({ loading: true })
    event.preventDefault()
    const { password } = this.state
    const data = new URLSearchParams()
    data.append('password', password)
    try {
      this.setState({ loading: false })
      await http().patch(`auth/resetPassword/${this.props.match.params.token}`, data)
      this.props.history.push('/sign-in')
    } catch (err) {
      this.setState({ message: err.response.data.message, alert: 'danger', show: true })
    }
  };
  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };
  render () {
    return (
      <Container fluid>
        <Row>
          <Col md={7} className="d-none d-md-block authentication-image">
            <div>
              <img className="mb-5" src={logo} alt="Logo Tickitz" />
              <h1>Lets build your account</h1>
              <p>
                To be a loyal moviegoer and access all of features, your details
                are required
              </p>
              <div className="custom-progress">
                <ul>
                  <li>
                    <span className="active">1</span>
                    <div className="progres">Fill your additional details</div>
                  </li>
                  <li>
                    <span className={(this.state.message === 'Please check email to reset password!' || this.props.match.params.token) ? 'active' : ''}>2</span>
                    <div className="progres">Active your account</div>
                  </li>
                  <li>
                    <span className={this.props.match.params.token ? 'active' : ''}>3</span>
                    <div className="progres">Enter your new password</div>
                  </li>
                  <li>
                    <span>4</span>
                    <div className="progres">Done</div>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={5} className="authentication-form">
            <div className="authentication-form-title">
              {this.props.match.params.token
                ? (
                <>
                  <h1>Reset Password</h1>
                  <p>please reset your password</p>
                </>
                  )
                : (
                <>
                  <h1>Fill your complete email</h1>
                  <p>we&apos;ll send a link to your email shortly</p>
                </>
                  )}
            </div>
            {this.state.message !== '' && this.state.show && <Alert variant={this.state.alert} onClose={() => this.setState({ show: false })} dismissible>{this.state.message}</Alert>}
            {this.props.match.params.token
              ? <Form onSubmit={this.resetPassword}>
              <FormInputPassword
                name="password"
                onChange={(event) => this.changeText(event)}
                placeholder="Write your password"
              >
                New Password
              </FormInputPassword>

              {this.state.loading
                ? <div className="text-center"><Spinner animation="border" /></div>
                : (<Button className={`${this.state.password !== '' ? 'btn-primary' : 'btn-disabled'} w-100 py-3 mb-4`} type="submit" disabled={this.state.password === ''}>
                Reset Password
              </Button>)}
            </Form>
              : <Form onSubmit={this.forgotPassword}>
              <FormInputText
                name="email"
                type="email"
                placeholder="Write your email"
                onChange={(event) => this.changeText(event)}
              >
                Email
              </FormInputText>

              {this.state.loading
                ? <div className="text-center"><Spinner animation="border" /></div>
                : (<Button className={`${this.state.email !== '' ? 'btn-primary' : 'btn-disabled'} w-100 py-3 mb-4`} type="submit" disabled={this.state.email === ''}>
                Activate now
              </Button>)}
            </Form>}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ForgotPassword
