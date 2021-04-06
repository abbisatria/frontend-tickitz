import React, { Component } from 'react'
import { Row, Col, Form, Alert, Spinner } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import FormInputText from '../../Form/FormInputText/FormInputText'
import Button from '../../Button/Button'
import { createCinema } from '../../../redux/actions/cinema'
import { connect } from 'react-redux'

class CreateCinema extends Component {
  state = {
    name: '',
    location: '',
    file: null,
    price: '',
    address: '',
    message: '',
    loading: false
  }

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  submitData = async (event) => {
    this.setState({ loading: true })
    event.preventDefault()
    const { name, location, file, price, address } = this.state
    await this.props.createCinema(this.props.auth.token, name, location, file, price, address)
    if (this.props.cinema.success === true) {
      this.setState({ loading: false })
      this.props.history.push('/admin/manage_cinema')
    } else {
      this.setState({ message: this.props.cinema.errorMsg, loading: false })
    }
  };

  render () {
    return (
      <Form onSubmit={this.submitData}>
        <h1>Create Cinema</h1>
        {this.state.message !== '' && <Alert variant="danger">{this.state.message}</Alert>}
        <Row className="mt-4">
          <Col md={4}>
            <FormInputText
              name="name"
              type="text"
              onChange={(event) => this.changeText(event)}
              placeholder="Write your name cinema"
            >
              Name Cinema
            </FormInputText>
          </Col>
          <Col md={8}>
            <FormInputText
              name="location"
              type="text"
              onChange={(event) => this.changeText(event)}
              placeholder="Write your location"
            >
              Location
            </FormInputText>
          </Col>
          <Col md={4}>
          <Form.Group>
            <Form.Label>Upload Image</Form.Label>
            <Form.Control onChange={(e) => this.setState({ file: e.target.files[0] })} type="file" />
          </Form.Group>
          </Col>
          <Col md={8}>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              onChange={(event) => this.changeText(event)}
              placeholder="Write your number"
            />
          </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                onChange={(event) => this.changeText(event)}
                rows={2}
                placeholder="Write your location"
              />
            </Form.Group>
          </Col>
        </Row>
        {this.state.loading ? <Spinner animation="border" /> : <Button className="btn btn-primary" type="submit">Save</Button>}
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  cinema: state.cinema
})

const mapDispatchToProps = { createCinema }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateCinema))
