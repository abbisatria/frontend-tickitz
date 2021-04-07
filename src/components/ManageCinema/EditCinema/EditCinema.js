import React, { Component } from 'react'
import { Row, Col, Form, Alert, Spinner } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import FormInputText from '../../Form/FormInputText/FormInputText'
import Button from '../../Button/Button'
import { editCinema } from '../../../redux/actions/cinema'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  cinemaName: Yup.string()
    .min(2, '*Cinema name must have at least 2 characters')
    .max(50, '*Cinema name must be less than 50 characters')
    .required('*Cinema name is required'),
  location: Yup.string()
    .min(2, '*Location must have at least 2 characters')
    .max(50, '*Location must be less than 50 characters')
    .required('*Location is required'),
  price: Yup.string()
    .min(2, '*Price must have at least 2 characters')
    .max(10, '*Price cant be longer than 10 characters')
    .required('*Price is required'),
  address: Yup.string()
    .min(2, '*Address must have at least 2 characters')
    .max(100, '*Address cant be longer than 100 characters')
    .required('*Address is required')
})

class EditCinema extends Component {
  state = {
    file: null,
    message: '',
    loading: false
  }

  submitData = async (values) => {
    this.setState({ loading: true })
    const { cinemaName, location, price, address } = values
    const { file } = this.state
    await this.props.editCinema(this.props.auth.token, this.props.cinema.details.id, cinemaName, location, file, price, address)
    if (this.props.cinema.errorMsg === '') {
      this.setState({ loading: false })
      this.props.history.push('/admin/manage_cinema')
    } else {
      this.setState({ message: this.props.cinema.errorMsg, loading: false })
    }
  };

  render () {
    return (
      <Formik
        initialValues={{
          cinemaName: this.props.cinema.details.name,
          location: this.props.cinema.details.location,
          price: this.props.cinema.details.price,
          address: this.props.cinema.details.address
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
              <h1>Create Cinema</h1>
              {this.state.message !== '' && <Alert variant="danger">{this.state.message}</Alert>}
              <Row className="mt-4">
                <Col md={4}>
                  <FormInputText
                    name="cinemaName"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write your name cinema"
                    defaultValue={values.cinemaName}
                    error={touched.cinemaName && errors.cinemaName
                      ? (<div className="error-message" style={{ color: 'red' }}>{errors.cinemaName}</div>)
                      : null}
                  >
                    Name Cinema
                  </FormInputText>
                </Col>
                <Col md={8}>
                  <FormInputText
                    name="location"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write your location"
                    defaultValue={values.location}
                    error={touched.location && errors.location
                      ? (<div className="error-message" style={{ color: 'red' }}>{errors.location}</div>)
                      : null}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write your number"
                    defaultValue={values.price}
                  />
                  {touched.price && errors.price
                    ? (<div className="error-message" style={{ color: 'red' }}>{errors.price}</div>)
                    : null}
                </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={2}
                      placeholder="Write your location"
                      defaultValue={values.address}
                    />
                    {touched.address && errors.address
                      ? (<div className="error-message" style={{ color: 'red' }}>{errors.address}</div>)
                      : null}
                  </Form.Group>
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
  cinema: state.cinema
})

const mapDispatchToProps = { editCinema }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditCinema))
