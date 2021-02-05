import React, { Component } from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link
} from 'react-router-dom'
import ManageMovie from '../../components/ManageMovie/ManageMovie'
import ManageCinema from '../../components/ManageCinema/ManageCinema'
import ManageGenre from '../../components/ManageGenre/ManageGenre'
import ManageShowtime from '../../components/ManageShowtime/ManageShowtime'
import CreateMovie from '../../components/ManageMovie/CreateMovie/CreateMovie'
import CreateCinema from '../../components/ManageCinema/CreateCinema/CreateCinema'
import CreateGenre from '../../components/ManageGenre/CreateGenre/CreateGenre'
import CreateShowtime from '../../components/ManageShowtime/CreateShowtime/CreateShowtime'
import BasedLocation from '../BasedLocation/BasedLocation'
import BasedMovie from '../BasedMovie/BasedMovie'

import './MovieDescription.scss'

export default class MovieDescription extends Component {
  render () {
    return (
      <div className="admin">
        <Container>
          <div className="card-panel">
            <Row>
              <Col md={3}>
                <Nav className="flex-column">
                  <Nav.Item className="d-flex flex-row align-items-center">
                    <Link className="nav-link" to="/admin/manage_movie">Manage Movie</Link>
                  </Nav.Item>
                  <Nav.Item className="d-flex flex-row align-items-center">
                    <Link className="nav-link" to="/admin/manage_genre">Manage Genre</Link>
                  </Nav.Item>
                  <Nav.Item className="d-flex flex-row align-items-center">
                    <Link className="nav-link" to="/admin/manage_cinema">Manage Cinema</Link>
                  </Nav.Item>
                  <Nav.Item className="d-flex flex-row align-items-center">
                    <Link className="nav-link" to="/admin/manage_showtime">Manage Showtime</Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={9}>
                <Switch>
                  <Route exact path="/admin">
                    <h1>Welcome to admin panel</h1>
                    <p>Here you can manage data for your system!</p>
                  </Route>
                  <Route path="/admin/manage_movie" exact>
                    <ManageMovie/>
                  </Route>
                  <Route path="/admin/manage_movie/create">
                    <CreateMovie/>
                  </Route>
                  <Route path="/admin/manage_cinema" exact>
                    <ManageCinema/>
                  </Route>
                  <Route path="/admin/manage_cinema/create">
                    <CreateCinema/>
                  </Route>
                  <Route path="/admin/manage_genre" exact>
                    <ManageGenre/>
                  </Route>
                  <Route path="/admin/manage_genre/create">
                    <CreateGenre/>
                  </Route>
                  <Route path="/admin/manage_showtime" exact>
                    <ManageShowtime/>
                  </Route>
                  <Route path="/admin/manage_showtime/create">
                    <CreateShowtime/>
                  </Route>
                </Switch>
              </Col>
            </Row>
          </div>
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
