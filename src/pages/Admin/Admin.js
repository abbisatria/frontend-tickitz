import React, { Component } from "react";
import Header from "../../parts/Header/Header";
import Footer from "../../parts/Footer/Footer";
import MovieDescription from "../../parts/MovieDescription/MovieDescription";

export default class Admin extends Component {
  state = {
    user: "",
  };
  componentDidMount() {
    let data = localStorage.getItem("myData");
    data = JSON.parse(data);
    if (data) {
      this.setState({ user: data.email });
    }
  }
  render() {
    return (
      <>
        <Header user={this.state.user} />
        <MovieDescription />
        <Footer />
      </>
    );
  }
}
