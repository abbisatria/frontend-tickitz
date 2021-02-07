import React, { Component } from 'react'
import { Row, Col, Form, Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import FormInputText from '../../Form/FormInputText/FormInputText'
import {connect} from 'react-redux'
import {editGenre} from '../../../redux/actions/genre'
import Button from '../../Button/Button'

class EditGenre extends Component {
  state = {
    name: '',
    message: ''
  }

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitData = async (event) => {
    event.preventDefault();
    const { name } = this.state
    if(name !== '') {
      await this.props.editGenre(this.props.auth.token, this.props.genre.details.id, name)
      if(this.props.genre.success === true) {
        this.props.history.push('/admin/manage_genre')
      } else {
        this.setState({ message: this.props.genre.errorMsg })
      }
    } else {
      await this.props.editGenre(this.props.auth.token, this.props.genre.details.id, this.props.genre.details.name)
      if(this.props.genre.success === true) {
        this.props.history.push('/admin/manage_genre')
      } else {
        this.setState({ message: this.props.genre.errorMsg })
      }
    }
  };
  render() {
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
              defaultValue={this.props.genre.details.name}
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

const mapStateToProps = state =>({
  auth: state.auth,
  genre: state.genre
})

const mapDispatchToProps = {editGenre}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditGenre))
