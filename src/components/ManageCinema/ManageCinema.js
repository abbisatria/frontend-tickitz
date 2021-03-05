import React, { Component } from 'react'
import { Table, Alert, Modal, Spinner } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import Button from '../Button/Button'
import { connect } from 'react-redux'
import { listCinema, detailCinema, deleteCinema } from '../../redux/actions/cinema'

class ManageCinema extends Component {
  state = {
    page: 1,
    message: '',
    show: false,
    isLoading: true
  };

  async componentDidMount () {
    await this.props.listCinema()
    this.setState({ isLoading: false })
  }

  prev = async () => {
    if (this.state.page > 1) {
      this.setState({ isLoading: true })
      await this.props.listCinema(this.state.page - 1)
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
    if (this.state.page !== this.props.cinema.pageInfo.totalPage) {
      this.setState({ isLoading: true })
      await this.props.listCinema(this.state.page + 1)
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

  delete = async (token, id) => {
    await this.props.deleteCinema(token, id)
    if (this.props.cinema.success === true) {
      await this.props.listCinema()
      this.setState({ message: 'Delete Success', show: false })
    } else {
      this.setState({ message: this.props.cinema.errorMsg })
    }
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
        <div className="d-flex justify-content-between mb-3">
          <h1>Cinema List</h1>
          <Link to="/admin/manage_cinema/create" className="btn btn-primary">
            Create Cinema
          </Link>
        </div>
        {this.state.message !== '' && <Alert variant="warning">{this.state.message}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
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
