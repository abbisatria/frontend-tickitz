import React, { Component } from "react";
import Header from "../../parts/Header/Header";
import Footer from "../../parts/Footer/Footer";

import OrderMovie from "../../parts/OrderMovie/OrderMovie";
import http from '../../helpers/http'
import {connect} from 'react-redux'

class Order extends Component {
  state = {
    soldSeat: [],
    idMovie: Number(this.props.location.state.data.showtimesId)
  };
  async componentDidMount() {
    try {
      const seatSold = await http().get(`seats/${Number(this.props.location.state.data.showtimesId)}`)
      this.setState({
        soldSeat: seatSold.data.results
      })
    } catch(err) {
      console.log(err.response.data.message)
    }
  }
  render() {
    return (
      <>
        <Header user={this.props.auth.user} />
        <OrderMovie
          showtime={this.props.order.results[0]}
          seat={this.state.soldSeat}
          movieId={this.state.idMovie}
        />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state =>({
  auth: state.auth,
  order: state.order
})

export default connect(mapStateToProps)(Order);
