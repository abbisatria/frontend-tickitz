import React, { Component } from 'react'
import { Table, Alert, Modal, Spinner } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import Button from '../Button/Button'
import {connect} from 'react-redux'
import {listGenre} from '../../redux/actions/genre'
import {detailGenre} from '../../redux/actions/genre'
import {deleteGenre} from '../../redux/actions/genre'

class ManageGenre extends Component {
  state = {
    page: 1,
    message: '',
    show: false,
    isLoading: true
  };

  async componentDidMount(){
    await this.props.listGenre()
    this.setState({isLoading: false})
  }
  
  prev = async () => {
    if(this.state.page > 1) {
      this.setState({isLoading: true})
      await this.props.listGenre(this.state.page - 1)
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
    if(this.state.page !== this.props.genre.pageInfo.totalPage) {
      this.setState({isLoading: true})
      await this.props.listGenre(this.state.page + 1)
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
    await this.props.deleteGenre(token, id)
    if(this.props.genre.success === true) {
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

  handleClose = () => this.setState({show: false})

  handleShow = () => this.setState({show: true})

  render() {
    return (
      <>
        <div className="d-flex justify-content-between mb-3">
          <h1>Genre List</h1>
          <Link to="/admin/manage_genre/create" className="btn btn-primary">
            Create Genre
          </Link>
        </div>
        {this.state.message !== '' && <Alert variant="warning">{this.state.message}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {(this.props.genre.results !== null && this.state.isLoading !== true) ? this.props.genre.results.map(value => {
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
          }) : <tr><td colSpan={4} className="text-center"><Spinner animation="border" /></td></tr>}
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

const mapStateToProps = state =>({
  auth: state.auth,
  genre: state.genre
})

const mapDispatchToProps = {listGenre, detailGenre, deleteGenre}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageGenre))
