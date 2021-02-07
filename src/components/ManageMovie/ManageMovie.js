import React, { Component } from 'react'
import { Table, Alert, Modal } from 'react-bootstrap'
import Button from '../Button/Button'
import {connect} from 'react-redux'
import {listMovie} from '../../redux/actions/movie'
import {detailMovie} from '../../redux/actions/movie'
import {detailMovieGenre} from '../../redux/actions/movie'
import {listAllGenre} from '../../redux/actions/genre'
import {deleteMovie} from '../../redux/actions/movie'
import Moment from 'react-moment'
import {withRouter} from 'react-router-dom'

class ManageMovie extends Component {
  state = {
    page: 1,
    message: '',
    show: false
  };

  async componentDidMount(){
    await this.props.listMovie()
  }
  
  prev = async () => {
    if(this.state.page >= 1) {
      await this.props.listMovie(this.state.page - 1)
      this.setState({
        page: this.state.page - 1
      })
    } else {
      this.setState({
        page: this.state.page
      })
    }
  }

  delete = async (token, id) => {
    await this.props.deleteMovie(token, id)
    if(this.props.movie.success === true) {
      await this.props.listMovie()
      this.setState({ message: 'Delete Success', show: false })
    } else {
      this.setState({ message: this.props.movie.errorMsg })
    }
  }

  next = async () => {
    if(this.state.page !== this.props.movie.pageInfo.totalPage) {
      await this.props.listMovie(this.state.page + 1)
      this.setState({
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

  handleClose = () => this.setState({show: false})

  handleShow = () => this.setState({show: true})

  render() {
    return (
      <>
        <div className="d-flex justify-content-between mb-3">
          <h1>Movie List</h1>
          <Button onClick={this.linkCreateMovie} className="btn btn-primary">
            Create Movie
          </Button>
        </div>
        {this.state.message !== '' && <Alert variant="warning">{this.state.message}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Release Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {this.props.movie.results !== null ? this.props.movie.results.map(value => {
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
          }) : <tr><td>Loading...</td></tr>}
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
  movie: state.movie,
  genre: state.genre
})

const mapDispatchToProps = {listMovie, detailMovie, detailMovieGenre, deleteMovie, listAllGenre}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageMovie))
