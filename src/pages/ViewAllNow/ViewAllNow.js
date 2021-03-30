import React, { Component } from 'react'
import Header from '../../parts/Header/Header'
import Footer from '../../parts/Footer/Footer'
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import http from '../../helpers/http'
import qs from 'querystring'
import CardMoviesUpcoming from '../../components/CardMoviesUpcoming/CardMoviesUpcoming'
import Button from '../../components/Button/Button'

import { connect } from 'react-redux'

class ViewAllNow extends Component {
  state = {
    nowShowingList: [],
    search: '',
    page: 1,
    isLoading: false,
    message: '',
    pageInfo: null,
    textLoading: 'Load More'
  };
  async componentDidMount () {
    const response = await http().get('movies/movieNowShowing?limit=8')
    this.setState({
      nowShowingList: response.data.results,
      pageInfo: response.data.pageInfo
    })
  }
  search = async (event) => {
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    this.setState({ [event.target.name]: event.target.value, isLoading: true })
    if (event.target.value) {
      query.search = event.target.value
    } else {
      delete query.search
    }
    await this.props.history.push({
      search: qs.stringify(query)
    })
    const response = await http().get(`movies/movieNowShowing?search=${event.target.value}&limit=8`)
    if (response.data.results.length > 0) {
      this.setState({
        nowShowingList: response.data.results,
        message: '',
        isLoading: false,
        page: 1,
        pageInfo: response.data.pageInfo
      })
    } else {
      this.setState({
        message: 'Movie Not Found',
        isLoading: false,
        page: 1
      })
    }
  };
  next = async () => {
    this.setState({ textLoading: 'Loading...' })
    if (this.state.pageInfo.currentPage < this.state.pageInfo.totalPage) {
      const { nowShowingList: oldNowShowingList, search } = this.state
      const response = await http().get(`movies/movieNowShowing?search=${search}&limit=8&page=${this.state.pageInfo.currentPage + 1}`)
      const nowShowing = response.data.results
      const newData = [...oldNowShowingList, ...nowShowing]
      this.setState({ nowShowingList: newData, pageInfo: response.data.pageInfo })
    }
    this.setState({ textLoading: 'Load More' })
  }
  render () {
    return (
      <>
        <Header user={this.props.auth.user} />
          <Container>
            <Row>
              <Col>
                <h2>Now Showing</h2>
              </Col>
              <Col className="d-flex justify-content-end mr-4">
                <Form.Group>
                  <Form.Control type="text" placeholder="Search Movie..." name="search" onChange={(event) => this.search(event)} />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              {this.state.isLoading
                ? <Col><div className="text-center"><Spinner animation="border" /></div></Col>
                : this.state.message !== ''
                  ? <Col><div className="text-center"><p>{this.state.message}</p></div></Col>
                  : this.state.nowShowingList.map((value, index) => {
                    return (
                  <Col md={3} key={String(index)} className="mb-3">
                    <CardMoviesUpcoming data={value} />
                  </Col>
                    )
                  })}
            </Row>
            <Row>
              <Col className="d-flex justify-content-center mt-4">
                <Button className="btn-primary px-4 py-2" onClick={this.next}>{this.state.textLoading}</Button>
              </Col>
            </Row>
          </Container>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(ViewAllNow)
