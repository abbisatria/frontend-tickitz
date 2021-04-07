import React, { Component } from 'react'
import { Row, Col, Form, Alert, Spinner } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import FormInputText from '../../Form/FormInputText/FormInputText'
import { connect } from 'react-redux'
import { createGenre } from '../../../redux/actions/genre'
import Button from '../../Button/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  genreName: Yup.string()
    .min(2, '*Genre name must have at least 2 characters')
    .max(50, '*Genre name must be less than 50 characters')
    .required('*Genre name is required')
})

class CreateGenre extends Component {
  state = {
    message: '',
    loading: false
  }

  submitData = async (values) => {
    this.setState({ loading: true })
    const { genreName } = values
    await this.props.createGenre(this.props.auth.token, genreName)
    if (this.props.genre.errorMsg === '') {
      this.setState({ loading: false })
      this.props.history.push('/admin/manage_genre')
    } else {
      this.setState({ message: this.props.genre.errorMsg, loading: false })
    }
  };

  render () {
    return (
      <Formik
        initialValues={{
          genreName: ''
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
              <h1>Create Genre</h1>
              {this.state.message !== '' && <Alert variant="danger">{this.state.message}</Alert>}
              <Row className="mt-4">
                <Col md={12}>
                  <FormInputText
                    name="genreName"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write your name genre"
                    defaultValue={values.genreName}
                    error={touched.genreName && errors.genreName
                      ? (<div className="error-message" style={{ color: 'red' }}>{errors.genreName}</div>)
                      : null}
                  >
                    Name Genre
                  </FormInputText>
                </Col>
              </Row>
              {this.state.loading ? <Spinner animation="border" /> : <Button className={!isValid ? 'btn-disabled' : 'btn-primary'} type="submit" disabled={!isValid}>Save</Button>}
            </Form>
          )}
      </Formik>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  genre: state.genre
})

const mapDispatchToProps = { createGenre }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateGenre))
