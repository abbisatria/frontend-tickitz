import React, { Component } from 'react'
import Header from '../../parts/Header/Header'
import Footer from '../../parts/Footer/Footer'
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import http from '../../helpers/http'
import qs from 'querystring'
import CardMoviesUpcoming from '../../components/CardMoviesUpcoming/CardMoviesUpcoming'
import Button from '../../components/Button/Button'

import './ViewAllNow.scss'

import { connect } from 'react-redux'

class ViewAllNow extends Component {
  state = {
    nowShowingList: [],
    search: '',
    isLoading: false,
    message: '',
    pageInfo: null,
    textLoading: 'Load More',
    order: 'ASC',
    sort: ''
  }
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
        pageInfo: response.data.pageInfo
      })
    } else {
      this.setState({
        message: 'Movie Not Found',
        isLoading: false
      })
    }
  }
  next = async () => {
    this.setState({ textLoading: 'Loading...' })
    if (this.state.pageInfo.currentPage < this.state.pageInfo.totalPage) {
      const { nowShowingList: oldNowShowingList, search, sort, order } = this.state
      const response = await http().get(`movies/movieNowShowing?search=${search}&limit=8&page=${this.state.pageInfo.currentPage + 1}&sort=${sort || 'id'}&order=${order || 'ASC'}`)
      const nowShowing = response.data.results
      const newData = [...oldNowShowingList, ...nowShowing]
      this.setState({ nowShowingList: newData, pageInfo: response.data.pageInfo })
    }
    this.setState({ textLoading: 'Load More' })
  }
  sort = async (event) => {
    if (event.target.value !== 'Sort') {
      this.setState({ [event.target.name]: event.target.value, isLoading: true })
      const { order } = this.state
      const response = await http().get(`movies/movieNowShowing?limit=8&sort=${event.target.value}&order=${order}`)
      this.setState({
        isLoading: false,
        nowShowingList: response.data.results,
        pageInfo: response.data.pageInfo
      })
    }
  }
  sortBy = async () => {
    const { sort, order, search } = this.state
    if (sort !== '') {
      if (order === 'ASC') {
        this.setState({ isLoading: true })
        const response = await http().get(`movies/movieNowShowing?limit=8&sort=${sort}&order=DESC&search=${search || ''}`)
        this.setState({
          isLoading: false,
          nowShowingList: response.data.results,
          pageInfo: response.data.pageInfo,
          order: 'DESC'
        })
      } else {
        this.setState({ isLoading: true })
        const response = await http().get(`movies/movieNowShowing?limit=8&sort=${sort}&order=ASC`)
        this.setState({
          isLoading: false,
          nowShowingList: response.data.results,
          pageInfo: response.data.pageInfo,
          order: 'ASC'
        })
      }
    }
  }
  render () {
    return (
      <>
        <Header user={this.props.auth.user} />
          <Container>
            <Row>
              <Col className="text-title">
                <h2>Now Showing</h2>
              </Col>
              <Col className="d-flex justify-content-end align-items-center mr-4 sort">
                <Form.Group className="mr-3">
                  <Form.Control type="text" placeholder="Search Movie..." name="search" onChange={(event) => this.search(event)} />
                </Form.Group>
                <Form.Group className="mr-3">
                  <Form.Control as="select" custom name="sort" onChange={(event) => this.sort(event)}>
                    <option>Sort</option>
                    <option value="name">Title</option>
                    <option value="releaseDate">Release</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group onClick={() => this.sortBy()}>
                  {this.state.order === 'ASC' ? <i className="fa fa-arrow-up"></i> : <i className="fa fa-arrow-down"></i>}
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
