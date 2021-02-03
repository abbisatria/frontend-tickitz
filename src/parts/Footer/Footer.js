import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/tickitz-logo.png'
import ebvId from '../../assets/images/ebv_id.png'
import hiflix from '../../assets/images/hiflix.png'
import cineOne21 from '../../assets/images/CineOne21.png'
import facebook from '../../assets/icon/eva_facebook-outline.png'
import instagram from '../../assets/icon/bx_bxl-instagram.png'
import twitter from '../../assets/icon/eva_twitter-outline.png'
import youtube from '../../assets/icon/feather_youtube.png'

import './Footer.scss'

class Footer extends Component {
  render () {
    return (
      <div className="footer">
        <Container>
          <Row>
            <Col md={4} sm={12}>
              <img src={logo} alt="Tickitz" />
              <p>
                Stop waiting in line. Buy tickets <br />
                conveniently, watch movies quietly
              </p>
            </Col>
            <Col md={2} sm={12}>
              <h5>Explore</h5>
              <ul className="list-unstyled">
                <li>
                  <Link className="link" to="/">
                    Cinemas
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    Movies List
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    My Ticket
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    Notification
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md={3} sm={12}>
              <h5>Sponsor</h5>
              <ul className="list-unstyled">
                <li>
                  <Link className="link" to="/">
                    <img className="sponsor" src={ebvId} alt="ebv id" />
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    <img className="sponsor" src={cineOne21} alt="cineOne21" />
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    <img className="sponsor" src={hiflix} alt="hiflix" />
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md={3} sm={12}>
              <h5>Follow us</h5>
              <ul className="list-unstyled">
                <li>
                  <Link className="link" to="/">
                    <img src={facebook} alt="facebook" />
                    <span>Tickitz Cinema id</span>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    <img src={instagram} alt="instagram" />
                    <span>tickitz.id</span>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    <img src={twitter} alt="twitter" />
                    <span>tickitz.id</span>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    <img src={youtube} alt="youtube" />
                    <span>Tickitz Cinema id</span>
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col className="copyright pt-4">
              &copy; 2020 Tickitz • All Rights Reserved.
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Footer
