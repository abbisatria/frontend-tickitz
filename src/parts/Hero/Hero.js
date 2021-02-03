import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import imageHero from '../../assets/images/img-hero.png'

import './Hero.scss'

class Hero extends Component {
  render () {
    return (
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={6} className="d-flex align-items-center">
            <div className="hero-title">
              <p>Nearest Cinema, Newest Movie.</p>
              <h1>Find out now!</h1>
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <img src={imageHero} alt="Hero" />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Hero
