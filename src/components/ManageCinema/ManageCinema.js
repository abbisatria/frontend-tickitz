import React, { Component } from 'react'
import { Table, Alert, Modal, Spinner, Form } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import Button from '../Button/Button'
import { connect } from 'react-redux'
import { listCinema, detailCinema, deleteCinema } from '../../redux/actions/cinema'

import qs from 'querystring'

class ManageCinema extends Component {
  state = {
    page: 1,
    message: '',
    show: false,
    isLoading: true,
    search: '',
    icSort: 'up'
  };

  async componentDidMount () {
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    await this.props.listCinema(query)
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
    await this.props.listCinema(query)
    if (this.props.cinema.results.length > 0) {
      this.setState({
        message: '',
        isLoading: false,
        page: 1
      })
    } else {
      this.setState({
        message: 'Cinema Not Found',
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
      query.page = this.props.cinema.pageInfo.currentPage - 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      this.setState({ isLoading: true })
      await this.props.listCinema(query)
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
    if (this.state.page !== this.props.cinema.pageInfo.totalPage) {
      query.page = this.props.cinema.pageInfo.currentPage + 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      this.setState({ isLoading: true })
      await this.props.listCinema(query)
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
    await this.props.listCinema(query)
    this.setState({ isLoading: false })
  }

  delete = async (token, id) => {
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    delete query.page
    delete query.sort
    delete query.order
    delete query.search
    await this.props.deleteCinema(token, id)
    if (this.props.cinema.success === true) {
      await this.props.listCinema()
      this.setState({ message: 'Delete Success', show: false })
    } else {
      this.setState({ message: this.props.cinema.errorMsg })
    }
    await this.props.history.push({
      search: qs.stringify(query)
    })
  }

  linkEditCinema = async (id) => {
    await this.props.detailCinema(id)
    this.props.history.push('/admin/manage_cinema/edit')
  }

  handleClose = () => this.setState({ show: false })

  handleShow = () => this.setState({ show: true })

  render () {
    return (
      <>
        <h1>Cinema List</h1>
        <div className="d-flex justify-content-between align-items-center my-3">
          <Form.Group>
            <Form.Control type="text" placeholder="Search Cinema..." name="search" onChange={(event) => this.search(event)} />
          </Form.Group>
          <Link to="/admin/manage_cinema/create" className="btn btn-primary">
            Create Cinema
          </Link>
        </div>
        {this.state.message !== '' && <Alert variant="warning">{this.state.message}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Name <i className={`fa fa-sort-${this.state.icSort}`} onClick={() => { this.order('name') }} /></th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {(this.props.cinema.results !== null && this.state.isLoading !== true)
            ? this.props.cinema.results.map(value => {
              return (
              <tr key={String(value.id)}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.location}</td>
                <td>
                <Button onClick={() => this.linkEditCinema(value.id)} className="btn btn-sm btn-warning mx-2">Edit</Button>
                <Button onClick={this.handleShow} className="btn btn-sm btn-danger">Delete</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Cinema</Modal.Title>
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
  cinema: state.cinema
})

const mapDispatchToProps = { listCinema, detailCinema, deleteCinema }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageCinema))
