import React, { Component } from 'react'
import { Table, Alert, Modal, Spinner, Form } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import Button from '../Button/Button'
import { connect } from 'react-redux'
import { listGenre, detailGenre, deleteGenre } from '../../redux/actions/genre'

import qs from 'querystring'

class ManageGenre extends Component {
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
    await this.props.listGenre(query)
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
    await this.props.listGenre(query)
    if (this.props.genre.results.length > 0) {
      this.setState({
        message: '',
        isLoading: false,
        page: 1
      })
    } else {
      this.setState({
        message: 'Genre Not Found',
        isLoading: false,
        page: 1
      })
    }
  };

  prev = async () => {
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    delete query.page
    if (this.state.page > 1) {
      query.page = this.props.genre.pageInfo.currentPage - 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      this.setState({ isLoading: true })
      await this.props.listGenre(query)
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

  next = async () => {
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    delete query.page
    if (this.state.page !== this.props.genre.pageInfo.totalPage) {
      query.page = this.props.genre.pageInfo.currentPage + 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      this.setState({ isLoading: true })
      await this.props.listGenre(query)
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
    await this.props.listGenre(query)
    this.setState({ isLoading: false })
  }

  delete = async (token, id) => {
    await this.props.deleteGenre(token, id)
    if (this.props.genre.success === true) {
      await this.props.listGenre()
      this.setState({ message: 'Delete Success', show: false })
    } else {
      this.setState({ message: this.props.genre.errorMsg })
    }
  }

  linkEditGenre = async (id) => {
    await this.props.detailGenre(id)
    this.props.history.push('/admin/manage_genre/edit')
  }

  handleClose = () => this.setState({ show: false })

  handleShow = () => this.setState({ show: true })

  render () {
    return (
      <>
        <h1>Genre List</h1>
        <div className="d-flex justify-content-between align-items-center my-3">
          <Form.Group>
            <Form.Control type="text" placeholder="Search Genre..." name="search" onChange={(event) => this.search(event)} />
          </Form.Group>
          <Link to="/admin/manage_genre/create" className="btn btn-primary">
            Create Genre
          </Link>
        </div>
        {this.state.message !== '' && <Alert variant="warning">{this.state.message}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Name <i className={`fa fa-sort-${this.state.icSort}`} onClick={() => { this.order('name') }} /></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {(this.props.genre.results !== null && this.state.isLoading !== true)
            ? this.props.genre.results.map(value => {
              return (
              <tr key={String(value.id)}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>
                  <Button onClick={() => this.linkEditGenre(value.id)} className="btn btn-sm btn-warning mx-2">Edit</Button>
                  <Button className="btn btn-sm btn-danger" onClick={this.handleShow}>Delete</Button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Genre</Modal.Title>
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
  genre: state.genre
})

const mapDispatchToProps = { listGenre, detailGenre, deleteGenre }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageGenre))
