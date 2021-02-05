import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import {connect} from 'react-redux'
import {listCinema} from '../../redux/actions/cinema'

class ManageCinema extends Component {
  state = {
    page: 1
  };

  async componentDidMount(){
    await this.props.listCinema()
  }
  
  prev = async () => {
    if(this.state.page >= 1) {
      await this.props.listCinema(this.state.page - 1)
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
    if(this.state.page !== this.props.cinema.pageInfo.totalPage) {
      await this.props.listCinema(this.state.page + 1)
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
          <h1>Cinema List</h1>
          <Link to="/admin/manage_cinema/create" className="btn btn-primary">
            Create Cinema
          </Link>
        </div>
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
          {this.props.cinema.results !== null ? this.props.cinema.results.map(value => {
            return (
              <tr key={String(value.id)}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.location}</td>
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
  cinema: state.cinema
})

const mapDispatchToProps = {listCinema}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCinema)
