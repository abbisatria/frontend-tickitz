import React, { Component } from 'react'
import { Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import {connect} from 'react-redux'
import {listMovie} from '../../redux/actions/movie'
import {listGenre} from '../../redux/actions/genre'
import {deleteMovie} from '../../redux/actions/movie'
import Moment from 'react-moment'
import {withRouter} from 'react-router-dom'

class ManageMovie extends Component {
  state = {
    page: 1,
    message: ''
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
      this.setState({ message: 'Delete Success' })
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
    await this.props.listGenre()
    this.props.history.push('/admin/manage_movie/create')
  }

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
                  <Link to="/admin/manage_movie/edit" className="btn btn-sm btn-warning mx-2">Edit</Link>
                  <Button onClick={() =>
                      this.delete(
                        this.props.auth.token, 
                        value.id
                      )
                    } className="btn btn-sm btn-danger">Delete</Button>
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

const mapDispatchToProps = {listMovie, deleteMovie, listGenre}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageMovie))
