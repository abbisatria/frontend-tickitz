import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CardNowShowing from '../../components/CardNowShowing/CardNowShowing'
import http from '../../helpers/http'

import './NowShowing.scss'

class NowShowing extends Component {
  state = {
    nowShowingList: []
  };
  async componentDidMount () {
    const response = await http().get('movies/movieNowShowing')
    this.setState({
      nowShowingList: response.data.results
    })
  }
  render () {
    return (
      <div className="now-showing">
        <Container>
          <Row>
            <Col>
              <h2>Now Showing</h2>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link to="/" className="view-all">
                view all
              </Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="movies">
            {this.state.nowShowingList.map((value, index) => {
              return <CardNowShowing data={value} key={String(index)} />
            })}
          </div>
        </Container>
      </div>
    )
  }
}

export default NowShowing
