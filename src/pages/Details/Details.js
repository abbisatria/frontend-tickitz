import React, { Component } from "react";
import Header from "../../parts/Header/Header";
import Footer from "../../parts/Footer/Footer";
import MovieDetails from "../../parts/MovieDetails/MovieDetails";
import ShowtimesTickets from "../../parts/ShowtimesTickets/ShowtimesTickets";
import http from '../../helpers/http'
import {connect} from 'react-redux'

class Details extends Component {
  state = {
    details: {}
  };
  async componentDidMount(){
    const response = await http().get(`movies/${this.props.match.params.id}`)
    this.setState({
      details: response.data.results
    })
  }
  render() {
    return (
      <>
        <Header user={this.props.auth.user} />
        <MovieDetails data={this.state.details} />
        <ShowtimesTickets movieId={this.props.match.params.id} />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state =>({
  auth: state.auth
})

export default connect(mapStateToProps)(Details);
