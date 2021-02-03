import React, { Component } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Button from '../../components/Button/Button'
import FormInputText from '../../components/Form/FormInputText/FormInputText'

import './JoinMember.scss'

class JoinMember extends Component {
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
              <Form className="form-join">
                <div className="form-join-outline">
                  <FormInputText
                    type="email"
                    name="email"
                    placeholder="Type your email"
                    className="form-control"
                  />
                </div>
                <br />
                <div className="form-join-outline">
                  <Button type="submit" className="btn-primary">
                    Join Now
                  </Button>
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
