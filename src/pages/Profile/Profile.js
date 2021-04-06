import React, { Component } from 'react'
import Header from '../../parts/Header/Header'
import Footer from '../../parts/Footer/Footer'

import ProfileInfo from '../../parts/ProfileInfo/ProfileInfo'
import { connect } from 'react-redux'
import http from '../../helpers/http'

class Profile extends Component {
  state = {
    order: []
  }
  async componentDidMount () {
    try {
      const order = await http(this.props.auth.token).get(`transaction/orderHistory/${this.props.auth.user.id}`)
      this.setState({
        order: order.data.results
      })
    } catch (err) {
      console.log(err.response.data.message)
    }
  }
  render () {
    return (
      <>
        <Header user={this.props.auth.user} />
        <ProfileInfo user={this.props.auth.user} order={this.state.order} token={this.props.auth.token} />
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Profile)
