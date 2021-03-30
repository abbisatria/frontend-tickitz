import React, { Component } from 'react'
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  Container
} from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { logout } from '../../redux/actions/auth'
import { clearOrder } from '../../redux/actions/order'
import { connect } from 'react-redux'

import './Header.scss'

import logo from '../../assets/images/tickitz-logo.png'
import avatar from '../../assets/icon/default-avatar.png'

const { REACT_APP_API_URL: URL } = process.env

class Header extends Component {
  signOut = (logout) => {
    logout()
    this.props.clearOrder()
    this.props.history.push('/sign-in')
  };

  profilePage = () => {
    this.props.history.push('/profile')
  };

  render () {
    return (
      <Container>
        <div className="d-none d-md-block">
          <Navbar bg="white" expand="md">
            <Navbar.Brand>
              <Link to="/">
                <img src={logo} alt="Logo Tickitz" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-between"
            >
              <Nav>
                <NavLink to="/" className="nav-link mr-4 ml-4">
                  Movies
                </NavLink>
                <NavLink to="/" className="nav-link mr-4">
                  Cinemas
                </NavLink>
                <NavLink to="/" className="nav-link">
                  Buy Ticket
                </NavLink>
              </Nav>
              <Nav className="d-flex align-items-center">
                <NavDropdown title="Location" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.2">ID</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">ENG</NavDropdown.Item>
                </NavDropdown>
                <Form className="search-box ml-4">
                  <input
                    type="text"
                    placeholder="Search"
                    className="search-txt"
                  />
                  <Button className="search-btn">
                    <i className="fa fa-search"></i>
                  </Button>
                </Form>
                {this.props.user
                  ? (
                  <NavDropdown
                    id="basic-nav-dropdown"
                    className="nav-link ml-4"
                    title={<img src={this.props.user.image && this.props.user.image !== 'null' ? `${URL}uploads/users/${this.props.user.image}` : avatar} alt="profile" className="photo-profile" />}
                  >
                    <NavDropdown.Item>
                      <Button
                        variant="link"
                        className="px-0"
                        onClick={() =>
                          this.profilePage()
                        }
                      >
                        Profile
                      </Button>
                    </NavDropdown.Item>
                    {this.props.auth.user.role === 1 && (
                      <NavDropdown.Item>
                        <Button
                        variant="link"
                        className="px-0"
                        onClick={() => {
                          this.props.history.push('/admin')
                        }}>
                          Dashboard
                        </Button>
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item>
                      <Button
                        variant="link"
                        className="px-0"
                        onClick={() =>
                          this.signOut(
                            this.props.logout
                          )
                        }
                      >
                        Sign Out
                      </Button>
                    </NavDropdown.Item>
                  </NavDropdown>
                    )
                  : (
                  <Link to="/sign-up" className="sign-up-button py-2 px-4 ml-4">
                    Sign Up
                  </Link>
                    )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <div className="d-sm-block d-md-none">
          <Navbar bg="transparent" expand="lg">
            <Navbar.Brand>
              <Link to="/">
                <img src={logo} alt="Logo Tickitz" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Form className="d-flex form-search my-4">
                  <Button type="submit">
                    <i className="fa fa-search"></i>
                  </Button>
                  <Form.Control type="search" placeholder="Search..." />
                </Form>
                <NavDropdown
                  title="Location"
                  id="basic-nav-dropdown"
                  className="nav-link text-center"
                >
                  <NavDropdown.Item href="#action/3.2">ID</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">ENG</NavDropdown.Item>
                </NavDropdown>
                <hr />
                <NavLink to="/" className="nav-link text-center">
                  Movies
                </NavLink>
                <hr />
                <NavLink to="/" className="nav-link text-center">
                  Cinemas
                </NavLink>
                <hr />
                <NavLink to="/" className="nav-link text-center">
                  Buy Ticket
                </NavLink>
                <hr />
                <NavLink to="/" className="nav-link text-center mt-4">
                  &copy; 2020 Tickitz • All Rights Reserved.
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
})

const mapDispatchToProps = { logout, clearOrder }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
