import React, { Component } from "react";
import Header from "../../parts/Header/Header";
import Footer from "../../parts/Footer/Footer";
import ProofOfPayment from "../../parts/ProofOfPayment/ProofOfPayment";

import {connect} from 'react-redux'

class Ticket extends Component {
  state = {
    ticket: this.props.location.state.data[0]
  };
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
  auth: state.auth
})

export default connect(mapStateToProps)(Ticket);
