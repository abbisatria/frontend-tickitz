import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Moment from "react-moment";

import "./MovieDetails.scss";

class MovieDetails extends Component {
  render() {
    return (
      <>
      {Object.keys(this.props.data).length > 0 && (
        <div className="movie-details mt-5">
        <Container>
          <Row>
            <Col md={4}>
              <div className="card-movies d-flex align-items-center justify-content-center">
                <img src={`http://localhost:5000/uploads/movies/${this.props.data.image}`} alt={this.props.data.name} />
              </div>
            </Col>
            <Col md={8}>
              <div className="title-movies mt-5 mt-lg-0">
                <h1>{this.props.data.name}</h1>
                <p>{this.props.data.genre}</p>
              </div>
              <div className="description-movies">
                <Row>
                  <Col xs={6} md={4}>
                    <h6>Release date</h6>
                    <h3> 
                      <Moment format="MMMM D, YYYY">
                        {this.props.data.releaseDate}
                      </Moment>
                    </h3>
                  </Col>
                  <Col xs={6} md={8}>
                    <h6>Directed</h6>
                    <h3>{this.props.data.directed}</h3>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs={6} md={4}>
                    <h6>Duration</h6>
                    <h3>{this.props.data.duration}</h3>
                  </Col>
                  <Col xs={6} md={8}>
                    <h6>Casts</h6>
                    <h3>{this.props.data.casts}</h3>
                  </Col>
                </Row>
                <hr />
                <h2>Synopsis</h2>
                <p>{this.props.data.description}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      )}
      </>
    );
  }
}

export default MovieDetails;
