import React, { Component } from 'react'
import { Row, Col, Form, Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import FormInputText from '../../Form/FormInputText/FormInputText'
import { connect } from 'react-redux'
import { createGenre } from '../../../redux/actions/genre'
import Button from '../../Button/Button'

class CreateGenre extends Component {
  state = {
    name: '',
    message: ''
  }

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  submitData = async (event) => {
    event.preventDefault()
    const { name } = this.state
    await this.props.createGenre(this.props.auth.token, name)
    if (this.props.genre.success === true) {
      this.props.history.push('/admin/manage_genre')
    } else {
      this.setState({ message: this.props.genre.errorMsg })
    }
  };
  render () {
    return (
      <Form onSubmit={this.submitData}>
        <h1>Create Genre</h1>
        {this.state.message !== '' && <Alert variant="warning">{this.state.message}</Alert>}
        <Row className="mt-4">
          <Col md={12}>
            <FormInputText
              name="name"
              type="text"
              onChange={(event) => this.changeText(event)}
              placeholder="Write your name genre"
            >
              Name Genre
            </FormInputText>
          </Col>
        </Row>
        <Button className="btn btn-primary" type="submit">Save</Button>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  genre: state.genre
})

const mapDispatchToProps = { createGenre }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateGenre))
