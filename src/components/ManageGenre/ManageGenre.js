import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import {connect} from 'react-redux'
import {listGenre} from '../../redux/actions/genre'

class ManageGenre extends Component {
  state = {
    page: 1
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

  render() {
    return (
      <>
        <div className="d-flex justify-content-between mb-3">
          <h1>Genre List</h1>
          <Link to="/admin/manage_genre/create" className="btn btn-primary">
            Create Genre
          </Link>
        </div>
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
                  <Link to="/admin/manage_cinema/delete" className="btn btn-sm btn-danger">Delete</Link>
                </td>
              </tr>
            )
          }) : <p>Loading...</p>}
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
  genre: state.genre
})

const mapDispatchToProps = {listGenre}

export default connect(mapStateToProps, mapDispatchToProps)(ManageGenre)
