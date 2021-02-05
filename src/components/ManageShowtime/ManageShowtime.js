import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class ManageShowtime extends Component {
  render() {
    return (
      <>
        <div className="d-flex justify-content-between mb-3">
          <h1>Showtime List</h1>
          <Link to="/admin/manage_showtime/create" className="btn btn-primary">
            Create Showtime
          </Link>
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
