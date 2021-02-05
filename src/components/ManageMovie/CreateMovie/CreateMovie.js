import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import FormInputText from '../../Form/FormInputText/FormInputText'
import Button from '../../Button/Button'
import Select from 'react-select'
import {connect} from 'react-redux'
import {createMovie} from '../../../redux/actions/movie'
import {listGenre} from '../../../redux/actions/genre'

import uploadHere from '../../../assets/images/upload_here.jpeg'

class CreateMovie extends Component {
  state = {
    genre: null,
    file: null,
    name: '',
    releaseDate: '',
    duration: '',
    directed: '',
    casts: '',
    description: '',
    category: '',
    imgPreview: null
  }

  async componentDidMount(){
    await this.props.listGenre()
  }
  options = this.props.genre.results.map(item => {
    return {label: item.name, value: item.id}
  })

  onChangeInput = (value) => {
    this.setState({
      genre: value
    })
  }

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitData = async (event) => {
    event.preventDefault();
    const { name, genre, file, releaseDate, duration, directed, casts, description, category  } = this.state
    const mapGenre = genre.map(item => item.value)
    await this.props.createMovie(this.props.auth.token, name, mapGenre, file, releaseDate, category, duration, directed, casts, description)
    if(this.props.movie.success === true) {
      this.props.history.push('/admin/manage_movie')
    } else {
      this.setState({ message: this.props.movie.errorMsg })
    }
  };

  render() {
    return (
      <>
      <Form onSubmit={this.submitData}>
        <h1>Create Movie</h1>
        <Row>
          <Col md={4}>
            <div className="card-movies d-flex align-items-center justify-content-center">
              <label className="upload-file">
                <input type="file" onChange={(e)=>this.setState({file: e.target.files[0], imgPreview: URL.createObjectURL(e.target.files[0])})} />
                <div className="image-file">
                  <img src={this.state.imgPreview !== null ? this.state.imgPreview : uploadHere} alt="movie" />
                </div>
              </label>
            </div>
          </Col>
          <Col md={8}>
            <Row>
              <Col md={12}>
                <FormInputText
                  type="text"
                  name="name"
                  onChange={(event) => this.changeText(event)}
                  placeholder="Write your title"
                >
                  Movie Name
                </FormInputText>
              </Col>
              <Col md={12} className="my-3">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Genre</Form.Label>
                  {Object.keys(this.options).length > 0 && <Select options={this.options} isMulti={true} onChange={this.onChangeInput} placeholder="Select your genre" />}
                </Form.Group>
              </Col>
              <Col md={6}>
                <FormInputText name="releaseDate" type="date" onChange={(event) => this.changeText(event)}>Release date</FormInputText>
              </Col>
              <Col md={6}>
                <FormInputText name="duration" type="text" onChange={(event) => this.changeText(event)} placeholder="Write your duration">Duration (hour / minute)</FormInputText>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={4}>
            <FormInputText
              type="text"
              name="directed"
              onChange={(event) => this.changeText(event)}
              placeholder="Write your Director"
            >
              Director
            </FormInputText>
          </Col>
          <Col md={6}>
            <FormInputText
              type="text"
              name="casts"
              onChange={(event) => this.changeText(event)}
              placeholder="Write your Casts"
            >
              Casts
            </FormInputText>
          </Col>
          <Col md={2}>
            <FormInputText
              type="text"
              name="category"
              onChange={(event) => this.changeText(event)}
              placeholder="Write your Category"
            >
              Casts
            </FormInputText>
          </Col>
          <Col md={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Sypnosis</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                onChange={(event) => this.changeText(event)}
                rows={2}
                placeholder="Write your description"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button className="btn btn-primary" type="submit">Save</Button>
      </Form>
      </>
    )
  }
}

const mapStateToProps = state =>({
  auth: state.auth,
  genre: state.genre,
  movie: state.movie
})

const mapDispatchToProps = {listGenre, createMovie}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateMovie))
