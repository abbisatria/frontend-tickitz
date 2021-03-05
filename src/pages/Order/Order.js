import React, { Component } from 'react'
import Header from '../../parts/Header/Header'
import Footer from '../../parts/Footer/Footer'

import OrderMovie from '../../parts/OrderMovie/OrderMovie'
import { connect } from 'react-redux'

class Order extends Component {
  render () {
    return (
      <>
        <Header user={this.props.auth.user} />
        <OrderMovie
          showtime={this.props.order.results[0]}
          seat={this.props.order.seatSold}
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

export default connect(mapStateToProps)(Order)
