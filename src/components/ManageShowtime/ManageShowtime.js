import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import Button from '../Button/Button'
import {connect} from 'react-redux'
import {listAllMovie} from '../../redux/actions/movie'

class ManageShowtime extends Component {
  linkCreateShowtime = async () => {
    await this.props.listAllMovie()
    this.props.history.push('/admin/manage_showtime/create')
  }
  render() {
    return (
      <>
        <div className="d-flex justify-content-between mb-3">
          <h1>Showtime List</h1>
          <Button onClick={this.linkCreateShowtime} className="btn btn-primary">
            Create Movie
          </Button>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Movie</th>
              <th>Cinema</th>
              <th>Showtime</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>
                <Link to="/admin/manage_showtime/edit" className="btn btn-sm btn-warning mx-2">Edit</Link>
                <Link to="/admin/manage_showitme/delete" className="btn btn-sm btn-danger">Delete</Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    )
  }
}

const mapStateToProps = state =>({
  movie: state.movie
})

const mapDispatchToProps = {listAllMovie}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageShowtime))
