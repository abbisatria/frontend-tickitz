import React, { Component } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import upComing1 from '../../assets/images/up-coming1.png'
import FormInputText from '../../components/Form/FormInputText/FormInputText'
import FormInputLocation from '../../components/Form/FormInputLocation/FormInputLocation'
import FormInputTime from '../../components/Form/FormInputTime/FormInputTime'
import Button from '../../components/Button/Button'
import BasedLocation from '../BasedLocation/BasedLocation'
import BasedMovie from '../BasedMovie/BasedMovie'

import ebvId from '../../assets/images/ebv_id.png'
import cineOne21 from '../../assets/images/CineOne21.png'
import hiflix from '../../assets/images/hiflix.png'

import './MovieDescription.scss'

export default class MovieDescription extends Component {
  render () {
    return (
      <div className="admin">
        <Container>
          <Row>
            <Col md={8}>
              <h1>Movie Description</h1>
              <div className="card-movie-description">
                <Row>
                  <Col md={4}>
                    <div className="card-movies d-flex align-items-center justify-content-center">
                      <img src={upComing1} alt="movie" />
                    </div>
                  </Col>
                  <Col md={8}>
                    <Row>
                      <Col md={12}>
                        <FormInputText
                          type="text"
                          defaultValue="Spider-Man: Homecoming"
                          placeholder="Write your title"
                        >
                          Movie Name
                        </FormInputText>
                      </Col>
                      <Col md={12} className="my-3">
                        <FormInputText
                          type="text"
                          defaultValue="Action, Adventure, Sci-Fi"
                          placeholder="Write your category"
                        >
                          Category
                        </FormInputText>
                      </Col>
                      <Col md={6}>
                        <FormInputText type="date">Release date</FormInputText>
                      </Col>
                      <Col md={6}>
                        <Form.Label>Duration (hour / minute)</Form.Label>
                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Control type="number" placeholder="0" />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Control type="number" placeholder="0" />
                          </Form.Group>
                        </Form.Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md={4}>
                    <FormInputText
                      type="text"
                      defaultValue="Jon Watts"
                      placeholder="Write your Director"
                    >
                      Director
                    </FormInputText>
                  </Col>
                  <Col md={8}>
                    <FormInputText
                      type="text"
                      defaultValue="Tom Holland, Michael Keaton, Robert Dow.."
                      placeholder="Write your Casts"
                    >
                      Casts
                    </FormInputText>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Sypnosis</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        defaultValue="Thrilled by his experience with the Avengers, Peter returns home, where he
lives with his Aunt May, | "
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={4}>
              <h1>Premiere Location</h1>
              <div className="card-premiere-location">
                <Row>
                  <Col md={12}>
                    <FormInputLocation />
                  </Col>
                </Row>
                <Row>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={ebvId} alt="ebv id" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={cineOne21} alt="cineOne21" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={hiflix} alt="hiflix" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={ebvId} alt="ebv id" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={cineOne21} alt="cineOne21" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={hiflix} alt="hiflix" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={ebvId} alt="ebv id" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={cineOne21} alt="cineOne21" />
                      </div>
                    </label>
                  </Col>
                  <Col md={4} xs={4}>
                    <label>
                      <input type="radio" name="cinema" />
                      <div className="cinema">
                        <img src={hiflix} alt="hiflix" />
                      </div>
                    </label>
                  </Col>
                </Row>
              </div>
              <h1>Showtimes</h1>
              <div className="card-showtimes">
                <Row>
                  <Col md={12}>
                    <FormInputTime />
                  </Col>
                </Row>
                <Row>
                  <Col md={3} xs={3}>
                    <Button className="outline-primary px-4">
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </Button>
                  </Col>
                  <Col md={3} xs={3}>
                    <p>08:30am</p>
                  </Col>
                  <Col md={3} xs={3}>
                    <p>08:30am</p>
                  </Col>
                  <Col md={3} xs={3}>
                    <p>08:30am</p>
                  </Col>
                  <Col md={3} xs={3}>
                    <p>08:30am</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Router>
              <Col md={12}>
                <h1>Sales Charts</h1>
                <div className="card-sales-card">
                  <NavLink
                    exact
                    to="/admin"
                    className="link mr-5"
                    activeClassName="active"
                  >
                    Based on Movie
                  </NavLink>
                  <NavLink exact to="/admin/based-location" className="link">
                    Based on Location
                  </NavLink>
                </div>
                <Switch>
                  <Route exact path="/admin">
                    <BasedMovie />
                  </Route>
                  <Route exact path="/admin/based-location">
                    <BasedLocation />
                  </Route>
                </Switch>
              </Col>
            </Router>
          </Row>
        </Container>
      </div>
    )
  }
}
