import React, { Component } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import FormInputText from "../../../components/Form/FormInputText/FormInputText";
import FormInputPassword from "../../../components/Form/FormInputPassword/FormInputPassword";
import http from '../../../helpers/http'

import logo from "../../../assets/images/logo-tickitz.png";
import icGoogle from "../../../assets/icon/ic-google.png";
import icFacebook from "../../../assets/icon/ic-facebook.png";

import "../auth.scss";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    message: ""
  };

  submitData = async (event) => {
    event.preventDefault();
    const { email, password } = this.state
    const data = new URLSearchParams()
    data.append('email', email)
    data.append('password', password)
    try {
      const response = await http().post('auth/register', data)
      this.setState({ message: response.data.message })
    } catch(err) {
      this.setState({ message: err.response.data.message })
    }
  };

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col
            md={7}
            className="d-none d-md-block align-items-center authentication-image"
          >
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
                    <span className={this.state.message === 'Register Success, Please verification email!' ? 'active' : ''}>2</span>
                    <div className="progres">Active your account</div>
                  </li>
                  <li>
                    <span>3</span>
                    <div className="progres">Done</div>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={5} className="authentication-form">
            <div className="authentication-form-title">
              <h1>Fill your additional details</h1>
            </div>
            {this.state.message !== '' && <Alert variant="warning">{this.state.message}</Alert>}
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

              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="I agree to terms & conditions"
                  required
                />
              </Form.Group>
              <Button className="btn-primary w-100 py-3 mb-4" type="submit">
                Join for free now
              </Button>
            </Form>
            <div className="text-center link mb-4">
              Do you already have an account?
              <Link to="/sign-in"> Log In</Link>
            </div>
            <div className="or-line text-center">
              <span>Or</span>
            </div>
            <Row>
              <Col className="d-flex justify-content-between mt-4">
                <div className="link-external py-3">
                  <a href="https://www.google.com/" rel="_blank">
                    <img src={icGoogle} alt="icon google" />
                    <span>Google</span>
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
    );
  }
}

export default SignUp;
