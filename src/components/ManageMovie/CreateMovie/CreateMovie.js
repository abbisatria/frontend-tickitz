import React, { Component } from 'react'
import { Row, Col, Form, Alert, Spinner } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import FormInputText from '../../Form/FormInputText/FormInputText'
import Button from '../../Button/Button'
import Select from 'react-select'
import { connect } from 'react-redux'
import { createMovie } from '../../../redux/actions/movie'
import { Formik } from 'formik'
import * as Yup from 'yup'

import uploadHere from '../../../assets/images/upload_here.jpeg'

const validationSchema = Yup.object().shape({
  movieName: Yup.string()
    .min(2, '*Movie name must have at least 2 characters')
    .max(50, '*Movie name must be less than 50 characters')
    .required('*Movie name is required'),
  duration: Yup.string()
    .min(8, '*Duration must have at least 8 characters')
    .max(8, '*Duration must be less than 8 characters')
    .required('*Duration is required'),
  director: Yup.string()
    .min(2, '*Director must have at least 2 characters')
    .max(50, '*Director must be less than 50 characters')
    .required('*Director is required'),
  casts: Yup.string()
    .min(2, '*Casts must have at least 2 characters')
    .max(150, '*Casts must be less than 150 characters')
    .required('*Casts is required'),
  category: Yup.string()
    .min(2, '*Category must have at least 2 characters')
    .max(50, '*Category must be less than 50 characters')
    .required('*Category is required'),
  description: Yup.string()
    .min(2, '*Description must have at least 2 characters')
    .max(500, '*Description must be less than 500 characters')
    .required('*Description is required'),
  releaseDate: Yup.date()
    .required('*Release Date is required')
})

class CreateMovie extends Component {
  state = {
    genre: [],
    file: null,
    imgPreview: null,
    message: '',
    show: false,
    errorGenre: '',
    loading: false
  }

  options = this.props.genre.results.map(item => {
    return { label: item.name, value: item.id }
  })

  onChangeInput = (value) => {
    this.setState({
      genre: value,
      errorGenre: ''
    })
  }

  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  submitData = async (values) => {
    this.setState({ loading: true })
    const {
      movieName,
      duration,
      director,
      casts,
      category,
      description,
      releaseDate
    } = values
    const { genre, file } = this.state
    if (genre.length > 0) {
      const mapGenre = genre.map(item => item.value)
      await this.props.createMovie(this.props.auth.token, movieName, mapGenre, file, releaseDate, category, duration, director, casts, description)
      if (this.props.movie.message !== '') {
        this.props.history.push('/admin/manage_movie')
      } else {
        this.setState({ message: this.props.movie.errorMsg, show: true, loading: false })
      }
    } else {
      this.setState({ errorGenre: '*Genre is required', loading: false })
    }
  };

  render () {
    return (
      <>
      <Formik
        initialValues={{
          movieName: '',
          duration: '',
          director: '',
          casts: '',
          category: '',
          description: '',
          releaseDate: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => this.submitData(values)}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid
          }) => (
            <Form onSubmit={handleSubmit}>
              <h1>Create Movie</h1>
              {this.state.message !== '' && this.state.show && <Alert variant="danger" onClose={() => this.setState({ show: false })} dismissible>{this.state.message}</Alert>}
              <Row>
                <Col md={4}>
                  <div className="card-movies d-flex align-items-center justify-content-center">
                    <label className="upload-file">
                      <input type="file" onChange={(e) => this.setState({ file: e.target.files[0], imgPreview: URL.createObjectURL(e.target.files[0]) })} />
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
                        name="movieName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Write your title"
                        defaultValue={values.movieName}
                        error={touched.movieName && errors.movieName
                          ? (<div className="error-message" style={{ color: 'red' }}>{errors.movieName}</div>)
                          : null}
                      >
                        Movie Name
                      </FormInputText>
                    </Col>
                    <Col md={12} className="my-3">
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Genre</Form.Label>
                        {Object.keys(this.options).length > 0 && <Select options={this.options} isMulti={true} onChange={this.onChangeInput} placeholder="Select your genre" />}
                        {this.state.errorGenre !== ''
                          ? (<div className="error-message" style={{ color: 'red' }}>{this.state.errorGenre}</div>)
                          : null}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <FormInputText
                        name="releaseDate"
                        type="date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.releaseDate}
                        error={touched.releaseDate && errors.releaseDate
                          ? (<div className="error-message" style={{ color: 'red' }}>{errors.releaseDate}</div>)
                          : null}
                        >
                        Release date
                      </FormInputText>
                    </Col>
                    <Col md={6}>
                      <FormInputText
                        name="duration"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Write your duration"
                        defaultValue={values.duration}
                        error={touched.duration && errors.duration
                          ? (<div className="error-message" style={{ color: 'red' }}>{errors.duration}</div>)
                          : null}
                        >
                          Duration (hour / minute)
                      </FormInputText>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md={4}>
                  <FormInputText
                    type="text"
                    name="director"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write your Director"
                    defaultValue={values.director}
                    error={touched.director && errors.director
                      ? (<div className="error-message" style={{ color: 'red' }}>{errors.director}</div>)
                      : null}
                  >
                    Director
                  </FormInputText>
                </Col>
                <Col md={6}>
                  <FormInputText
                    type="text"
                    name="casts"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write your Casts"
                    defaultValue={values.casts}
                    error={touched.casts && errors.casts
                      ? (<div className="error-message" style={{ color: 'red' }}>{errors.casts}</div>)
                      : null}
                  >
                    Casts
                  </FormInputText>
                </Col>
                <Col md={2}>
                  <FormInputText
                    type="text"
                    name="category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Category"
                    defaultValue={values.category}
                    error={touched.category && errors.category
                      ? (<div className="error-message" style={{ color: 'red' }}>{errors.category}</div>)
                      : null}
                  >
                    Category
                  </FormInputText>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Sypnosis</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={2}
                      placeholder="Write your description"
                      defaultValue={values.description}
                    />
                    {touched.description && errors.description
                      ? (<div className="error-message" style={{ color: 'red' }}>{errors.description}</div>)
                      : null}
                  </Form.Group>
                </Col>
              </Row>
              {this.state.loading ? <Spinner animation="border" /> : <Button className={!isValid ? 'btn-disabled' : 'btn-primary'} type="submit" disabled={!isValid}>Save</Button>}
            </Form>
          )}
      </Formik>
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  genre: state.genre,
  movie: state.movie
})

const mapDispatchToProps = { createMovie }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateMovie))
