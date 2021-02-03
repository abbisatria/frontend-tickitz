import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CardMoviesUpcoming from "../../components/CardMoviesUpcoming/CardMoviesUpcoming";
import http from '../../helpers/http'
import moment from 'moment'

import "./ComingMovies.scss";

class ComingMovies extends Component {
  state = {
    month: [
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
    ],
    movieUpComing: [],
    movieComing:[],
    message: ''
  };

  async componentDidMount(){
    const response = await http().get('movies/movieMonth')
    this.setState({
      movieUpComing: response.data.results
    })
  }

  searhMovie = (month) => {
    const movieMonth = this.state.movieUpComing.filter(
      (value) =>  moment(value.releaseDate).format('DD MMMM YYYY').indexOf(month) !== -1
    )
    if (movieMonth.length > 0) {
      this.setState({
        movieComing: movieMonth,
        message: ''
      });
    } else {
      this.setState({
        message: `UpComing Movies ${month} Not Found`
      });
    }
  };

  viewAllMovie = () => {
    this.setState({
      movieComing: [],
      message: ''
    });
  };

  render() {
    return (
      <div className="upcoming-movies">
        <Container>
          <Row>
            <Col>
              <h2>Upcoming Movies</h2>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link
                to=""
                className="view-all"
                onClick={() => this.viewAllMovie()}
              >
                view all
              </Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="month-movies">
            {this.state.month.map((value, index) => {
              return (
                <Button
                  className="outline-primary"
                  key={String(index)}
                  onClick={() => this.searhMovie(value)}
                >
                  {value}
                </Button>
              );
            })}
          </div>
          <div className="movies-upcoming">
            {this.state.message !== '' ? <p>{this.state.message}</p> : this.state.movieComing.length > 0 ? this.state.movieComing.map((value, index) => {
              return <CardMoviesUpcoming data={value} key={String(index)} />;
            }) : this.state.movieUpComing.map((value, index) => {
              return <CardMoviesUpcoming data={value} key={String(index)} />;
            })}
          </div>
        </Container>
      </div>
    );
  }
}

export default ComingMovies;
