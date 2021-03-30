import React, { Component } from 'react'
import { Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap'
import Button from '../../components/Button/Button'
import FormInputText from '../../components/Form/FormInputText/FormInputText'
import http from '../../helpers/http'

import './JoinMember.scss'

class JoinMember extends Component {
  state = {
    email: '',
    show: false,
    message: '',
    loading: false,
    variant: 'danger'
  }
  changeText = async (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  submitData = async () => {
    event.preventDefault()
    this.setState({ loading: true })
    const { email } = this.state
    if (email !== '') {
      const params = new URLSearchParams()
      params.append('email', email)
      try {
        const results = await http().post('users/moviegoers', params)
        this.setState({ loading: false, message: results.data.message, show: true, variant: 'success' })
      } catch (err) {
        const { message } = err.response.data
        this.setState({ loading: false, message: message, show: true, variant: 'danger' })
      }
    } else {
      this.setState({ loading: false, message: 'Email is required', show: true, variant: 'danger' })
    }
  }
  render () {
    return (
      <Container>
        <div className="join-member">
          <Row>
            <Col md={12} className="text-center my-5">
              <h3>Be the vanguard of the</h3>
              <h1>Moviegoers</h1>
            </Col>
            <Col md={12}>
            {this.state.message !== '' && this.state.show && (
              <div className="d-flex align-items-center justify-content-center">
                <Alert variant={this.state.variant} className="w-50" onClose={() => this.setState({ show: false })} dismissible>
                  {this.state.message}
                </Alert>
              </div>
            )}
              <Form className="form-join" onSubmit={this.submitData}>
                <div className="form-join-outline">
                  <FormInputText
                    type="email"
                    name="email"
                    placeholder="Type your email"
                    className="form-control"
                    onChange={(event) => this.changeText(event)}
                  />
                </div>
                <br />
                <div className="form-join-outline">
                  {this.state.loading
                    ? <Spinner animation="border" />
                    : <Button type="submit" className="btn-primary">
                    Join Now
                  </Button>}
                </div>
              </Form>
            </Col>
            <Col md={12} className="my-5">
              <p className="text-center">
                By joining you as a Tickitz member, <br />
                we will always send you the latest updates via email
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}

export default JoinMember
