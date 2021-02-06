import React, { Component } from 'react'
import { Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import {connect} from 'react-redux'
import {listGenre} from '../../redux/actions/genre'
import {deleteGenre} from '../../redux/actions/genre'

class ManageGenre extends Component {
  state = {
    page: 1,
    message: ''
  };

  async componentDidMount(){
    await this.props.listGenre()
  }
  
  prev = async () => {
    if(this.state.page >= 1) {
      await this.props.listGenre(this.state.page - 1)
      this.setState({
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
      await this.props.listGenre(this.state.page + 1)
      this.setState({
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
      this.setState({ message: 'Delete Success' })
    } else {
      this.setState({ message: this.props.genre.errorMsg })
    }
  }

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
          {this.props.genre.results !== null ? this.props.genre.results.map(value => {
            return (
              <tr key={String(value.id)}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>
                  <Link to="/admin/manage_cinema/edit" className="btn btn-sm btn-warning mx-2">Edit</Link>
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
  genre: state.genre
})

const mapDispatchToProps = {listGenre, deleteGenre}

export default connect(mapStateToProps, mapDispatchToProps)(ManageGenre)
