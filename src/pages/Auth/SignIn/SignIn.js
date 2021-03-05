import React, { Component } from 'react'
import { Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap'
import Button from '../../../components/Button/Button'
import { Link } from 'react-router-dom'
import FormInputText from '../../../components/Form/FormInputText/FormInputText'
import FormInputPassword from '../../../components/Form/FormInputPassword/FormInputPassword'

import { connect } from 'react-redux'
import { login } from '../../../redux/actions/auth'

import logo from '../../../assets/images/logo-tickitz.png'
import icGoogle from '../../../assets/icon/ic-google.png'
import icFacebook from '../../../assets/icon/ic-facebook.png'

import '../auth.scss'

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false
  };

  submitData = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    const { email, password } = this.state
    await this.props.login(email, password)
    this.setState({ isLoading: false })
  };

  componentDidUpdate () {
    if (this.props.auth.token) {
      if (this.props.auth.user.role === 1) {
        if (this.props.location.state === undefined) {
          this.props.history.push('/admin')
        } else {
          this.props.history.push((this.props.location.state.from && this.props.location.state.from.pathname))
        }
      } else {
        if (this.props.location.state === undefined || this.props.location.state.from.state === undefined) {
          this.props.history.push('/')
        } else {
          this.props.history.push((this.props.location.state.from && this.props.location.state.from.pathname))
        }
      }
    }
  }

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  render () {
    return (
      <Container fluid>
        <Row>
          <Col md={7} className="d-none d-md-block authentication-image">
            <div className="d-flex justify-content-center align-items-center flex-column h-100">
              <img src={logo} alt="Logo Tickitz" style={{ width: 500 }} />
              <h2>wait, watch, wow!</h2>
            </div>
          </Col>
          <Col md={5} className="authentication-form">
            <div className="authentication-form-title">
              <h1>Sign In</h1>
              <p>
                Sign in with your data that you entered during your registration
              </p>
            </div>
            {this.props.auth.errorMsg !== '' && <Alert variant="danger">{this.props.auth.errorMsg}</Alert>}
            <Form onSubmit={this.submitData}>
              <FormInputText
                name="email"
                onChange={(event) => this.changeText(event)}
                type="email"
                placeholder="Write your email"
              >
                Email
              </FormInputText>
              <FormInputPassword
                name="password"
                onChange={(event) => this.changeText(event)}
                placeholder="Write your password"
              >
                Password
              </FormInputPassword>

              {this.state.isLoading === false
                ? <Button className="btn-primary w-100 py-3 mb-4" type="submit">
                Sign In
              </Button>
                : <div className="text-center"><Spinner animation="border" /></div>}
            </Form>
            <div className="text-center link mb-4">
              Forgot your password?
              <Link to="/forgot-password"> Reset now</Link>
            </div>
            <div className="or-line text-center">
              <span>Or</span>
            </div>
            <Row>
              <Col className="d-flex justify-content-between mt-4">
                <div className="link-external py-3">
                  <a href="https://www.google.com/" rel="_blank">
                    <img src={icGoogle} alt="icon google" />
                    <span className="d-md-block d-sm-none">Google</span>
                  </a>
                </div>
                <div className="link-external py-3">
                  <a href="https://www.facebook.com/" rel="_blank">
                    <img src={icFacebook} alt="icon facebook" />
                    <span>Facebook</span>
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})
const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
