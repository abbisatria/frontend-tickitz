import React, { Component } from 'react'
import { Container, Row, Col, Form, Alert } from 'react-bootstrap'
import Button from '../../../components/Button/Button'
import FormInputText from '../../../components/Form/FormInputText/FormInputText'
import FormInputPassword from "../../../components/Form/FormInputPassword/FormInputPassword"
import http from '../../../helpers/http'

import logo from '../../../assets/images/logo-tickitz.png'

import '../auth.scss'

class ForgotPassword extends Component {
  state = {
    email: '',
    password: '',
    message: ''
  }
  forgotPassword = async (event) => {
    event.preventDefault();
    const { email } = this.state
    const data = new URLSearchParams()
    data.append('email', email)
    try {
      const response = await http().post('auth/forgotPassword', data)
      this.setState({ message: response.data.message })
    } catch(err) {
      this.setState({ message: err.response.data.message })
    }
  };
  resetPassword = async (event) => {
    event.preventDefault();
    const { password } = this.state
    const data = new URLSearchParams()
    data.append('password', password)
    try {
      await http().patch(`auth/resetPassword/${this.props.match.params.token}`, data)
      this.props.history.push('/sign-in')
    } catch(err) {
      this.setState({ message: err.response.data.message })
    }
  };
  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
              <h1>Fill your complete email</h1>
              <p>we&apos;ll send a link to your email shortly</p>
            </div>
            {this.state.message !== '' && <Alert variant="warning">{this.state.message}</Alert>}
            {this.props.match.params.token ? <Form onSubmit={this.resetPassword}>
              <FormInputPassword
                name="password"
                onChange={(event) => this.changeText(event)}
                placeholder="Write your password"
              />

              <Button className="btn-primary w-100 py-3 mb-4" type="submit">
                Reset Password
              </Button>
            </Form> : <Form onSubmit={this.forgotPassword}>
              <FormInputText
                name="email"
                type="email"
                placeholder="Write your email"
                onChange={(event) => this.changeText(event)}
              >
                Email
              </FormInputText>

              <Button className="btn-primary w-100 py-3 mb-4" type="submit">
                Activate now
              </Button>
            </Form>}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ForgotPassword
