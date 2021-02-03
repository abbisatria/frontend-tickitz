import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ChartMovie from '../../components/ChartMovie/ChartMovie'

export default class BasedMovie extends Component {
  render () {
    return (
      <Row>
        <Col md={4}>
          <ChartMovie />
        </Col>
        <Col md={4}>
          <ChartMovie />
        </Col>
        <Col md={4}>
          <ChartMovie />
        </Col>
      </Row>
    )
  }
}
