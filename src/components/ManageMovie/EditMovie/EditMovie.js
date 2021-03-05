import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import FormInputText from '../../Form/FormInputText/FormInputText'
import Button from '../../Button/Button'
import Select from 'react-select'
import { connect } from 'react-redux'
import { editMovie } from '../../../redux/actions/movie'

import uploadHere from '../../../assets/images/upload_here.jpeg'

const { REACT_APP_API_URL: URL } = process.env

class EditMovie extends Component {
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

  options = this.props.genre.results.map(item => {
    return { label: item.name, value: item.id }
  })

  value = this.props.movie.detailsGenre.map(item => {
    return { label: item.genre, value: item.id }
  })

  onChangeInput = (value) => {
    this.setState({
      genre: value
    })
  }

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  submitData = async (event) => {
    event.preventDefault()
    const { name, genre, file, releaseDate, duration, directed, casts, description, category } = this.state
    if (genre !== null) {
      const mapGenre = genre.map(item => item.value)
      await this.props.editMovie(this.props.auth.token, this.props.movie.details.id, name, mapGenre, file, releaseDate, category, duration, directed, casts, description)
      if (this.props.movie.success === true) {
        this.props.history.push('/admin/manage_movie')
      } else {
        this.setState({ message: this.props.movie.errorMsg })
      }
    } else {
      const mapGenre = this.value.map(item => item.value)
      await this.props.editMovie(this.props.auth.token, this.props.movie.details.id, name, mapGenre, file, releaseDate, category, duration, directed, casts, description)
      if (this.props.movie.success === true) {
        this.props.history.push('/admin/manage_movie')
      } else {
        this.setState({ message: this.props.movie.errorMsg })
      }
    }
  };

  render () {
    return (
      <>
      <Form onSubmit={this.submitData}>
        <h1>Create Movie</h1>
        <Row>
          <Col md={4}>
            <div className="card-movies d-flex align-items-center justify-content-center">
              <label className="upload-file">
                <input type="file" onChange={(e) => this.setState({ file: e.target.files[0], imgPreview: URL.createObjectURL(e.target.files[0]) })} />
                <div className="image-file">
                  <img src={this.state.imgPreview !== null ? this.state.imgPreview : this.props.movie.details.image ? `${URL}uploads/movies/${this.props.movie.details.image}` : uploadHere} alt="movie" />
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
                  defaultValue={this.props.movie.details.name}
                  placeholder="Write your title"
                >
                  Movie Name
                </FormInputText>
              </Col>
              <Col md={12} className="my-3">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Genre</Form.Label>
                  {Object.keys(this.options).length > 0 && <Select options={this.options} defaultValue={this.value} isMulti={true} onChange={this.onChangeInput} placeholder="Select your genre" />}
                </Form.Group>
              </Col>
              <Col md={6}>
                <FormInputText name="releaseDate" type="date" onChange={(event) => this.changeText(event)} defaultValue={this.props.movie.details.releaseDate}>Release date</FormInputText>
              </Col>
              <Col md={6}>
                <FormInputText name="duration" type="text" onChange={(event) => this.changeText(event)} defaultValue={this.props.movie.details.duration} placeholder="Write your duration">Duration (hour / minute)</FormInputText>
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
              defaultValue={this.props.movie.details.directed}
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
              defaultValue={this.props.movie.details.casts}
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
              defaultValue={this.props.movie.details.category}
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
                defaultValue={this.props.movie.details.description}
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

const mapStateToProps = state => ({
  auth: state.auth,
  genre: state.genre,
  movie: state.movie
})

const mapDispatchToProps = { editMovie }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditMovie))
