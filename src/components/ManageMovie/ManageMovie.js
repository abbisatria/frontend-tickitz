import React, { Component } from 'react'
import { Table, Alert, Modal, Spinner, Form } from 'react-bootstrap'
import Button from '../Button/Button'
import { connect } from 'react-redux'
import { listMovie, detailMovie, detailMovieGenre, deleteMovie, listAllMovie } from '../../redux/actions/movie'

import { listAllGenre } from '../../redux/actions/genre'
import qs from 'querystring'

import Moment from 'react-moment'
import { withRouter } from 'react-router-dom'

class ManageMovie extends Component {
  state = {
    page: 1,
    message: '',
    show: false,
    isLoading: true,
    icSort: 'up'
  };

  async componentDidMount () {
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    await this.props.listMovie(query)
    this.setState({ isLoading: false })
  }

  search = async (event) => {
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    this.setState({ isLoading: true })
    delete query.page
    if (event.target.value) {
      query.search = event.target.value
    } else {
      delete query.search
    }
    await this.props.history.push({
      search: qs.stringify(query)
    })
    await this.props.listMovie(query)
    if (this.props.movie.results.length > 0) {
      this.setState({
        message: '',
        isLoading: false,
        page: 1
      })
    } else {
      this.setState({
        message: 'Movie Not Found',
        isLoading: false,
        page: 1
      })
    }
  };

  order = async (value) => {
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    delete query.page
    this.setState({ isLoading: true })
    if (this.state.icSort === 'down') {
      this.setState({ icSort: 'up' })
      query.sort = value
      query.order = 'DESC'
    } else {
      this.setState({ icSort: 'down' })
      query.sort = value
      query.order = 'ASC'
    }
    await this.props.history.push({
      search: qs.stringify(query)
    })
    await this.props.listMovie(query)
    this.setState({ isLoading: false })
  }

  prev = async () => {
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    delete query.page
    if (this.state.page > 1) {
      query.page = this.props.movie.pageInfo.currentPage - 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      this.setState({ isLoading: true })
      await this.props.listMovie(query)
      this.setState({
        isLoading: false,
        page: this.state.page - 1
      })
    } else {
      this.setState({
        page: this.state.page
      })
    }
  }

  delete = async (token, id) => {
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    delete query.page
    delete query.sort
    delete query.order
    delete query.search
    await this.props.deleteMovie(token, id)
    if (this.props.movie.success === true) {
      await this.props.listMovie()
      this.setState({ message: 'Delete Success', show: false })
    } else {
      this.setState({ message: this.props.movie.errorMsg })
    }
    await this.props.history.push({
      search: qs.stringify(query)
    })
  }

  next = async () => {
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    delete query.page
    if (this.state.page !== this.props.movie.pageInfo.totalPage) {
      query.page = this.props.movie.pageInfo.currentPage + 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      this.setState({ isLoading: true })
      await this.props.listMovie(query)
      this.setState({
        isLoading: false,
        page: this.state.page + 1
      })
    } else {
      this.setState({
        page: this.state.page
      })
    }
  }

  linkCreateMovie = async () => {
    await this.props.listAllGenre()
    this.props.history.push('/admin/manage_movie/create')
  }

  linkEditMovie = async (id) => {
    await this.props.listAllGenre()
    await this.props.detailMovieGenre(id)
    await this.props.detailMovie(id)
    this.props.history.push('/admin/manage_movie/edit')
  }

  linkCreateShowtime = async () => {
    await this.props.listAllMovie()
    this.props.history.push('/admin/manage_showtime/create')
  }

  handleClose = () => this.setState({ show: false })

  handleShow = () => this.setState({ show: true })

  render () {
    return (
      <>
        <h1>Movie List</h1>
        <div className="d-flex justify-content-between align-items-center my-3">
          <Form.Group>
            <Form.Control type="text" placeholder="Search Movie..." name="search" onChange={(event) => this.search(event)} />
          </Form.Group>
          <div>
            <Button onClick={this.linkCreateMovie} className="btn btn-primary mr-3">
              Create Movie
            </Button>
            <Button onClick={this.linkCreateShowtime} className="btn btn-primary">
              Create Showtime
            </Button>
          </div>
        </div>
        {this.state.message !== '' && <Alert variant="warning">{this.state.message}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Name <i className={`fa fa-sort-${this.state.icSort}`} onClick={() => { this.order('name') }} /></th>
              <th>Release Date <i className={`fa fa-sort-${this.state.icSort}`} onClick={() => { this.order('releaseDate') }} /></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {(this.props.movie.results !== null && this.state.isLoading !== true)
            ? this.props.movie.results.map(value => {
              return (
              <tr key={String(value.id)}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>
                  <Moment format="DD MMMM YYYY">
                    {value.releaseDate}
                  </Moment>
                </td>
                <td>
                <Button onClick={() => this.linkEditMovie(value.id)} className="btn btn-sm btn-warning mx-2">Edit</Button>
                <Button onClick={this.handleShow} className="btn btn-sm btn-danger">Delete</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Movie</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>are you sure you want to delete it?</Modal.Body>
                  <Modal.Footer>
                    <Button className="btn btn-secondary" onClick={this.handleClose}>
                      No
                    </Button>
                    <Button className="btn btn-primary" onClick={() =>
                      this.delete(
                        this.props.auth.token,
                        value.id
                      )
                    } >
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
                </td>
              </tr>
              )
            })
            : <tr><td colSpan={4} className="text-center"><Spinner animation="border" /></td></tr>}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Button className="btn outline-primary mr-3" onClick={this.prev}>Prev Link</Button>
          <Button className="btn outline-primary" onClick={this.next}>Next Link</Button>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  movie: state.movie,
  genre: state.genre
})

const mapDispatchToProps = { listMovie, detailMovie, detailMovieGenre, deleteMovie, listAllGenre, listAllMovie }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageMovie))
