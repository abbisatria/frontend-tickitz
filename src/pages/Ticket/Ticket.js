import React, { Component } from "react";
import Header from "../../parts/Header/Header";
import Footer from "../../parts/Footer/Footer";
import ProofOfPayment from "../../parts/ProofOfPayment/ProofOfPayment";

import {connect} from 'react-redux'

class Ticket extends Component {
  state = {
    ticket: this.props.order.resultsCheckOut[0]
  }
  render() {
    return (
      <>
        <Header user={this.props.auth.user} />
        <ProofOfPayment
          ticket={this.state.ticket}
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

export default connect(mapStateToProps)(Ticket);
