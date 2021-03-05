import React, { Component } from 'react'
import Header from '../../parts/Header/Header'
import Footer from '../../parts/Footer/Footer'

import PaymentInfo from '../../parts/PaymentInfo/PaymentInfo'
import { connect } from 'react-redux'

class Payment extends Component {
  render () {
    return (
      <>
        <Header user={this.props.auth.user} />
        <PaymentInfo
          showtime={this.props.order.results[0]}
          seat={this.props.order.seatChecked}
          token={this.props.auth.token}
          user={this.props.auth.user}
        />
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
})

export default connect(mapStateToProps)(Payment)
