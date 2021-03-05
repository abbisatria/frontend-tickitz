import React, { Component } from 'react'
import Header from '../../parts/Header/Header'
import Hero from '../../parts/Hero/Hero'
import NowShowing from '../../parts/NowShowing/NowShowing'
import ComingMovies from '../../parts/ComingMovies/ComingMovies'
import JoinMember from '../../parts/JoinMember/JoinMember'
import Footer from '../../parts/Footer/Footer'

import { connect } from 'react-redux'

class Home extends Component {
  render () {
    return (
      <>
        <Header user={this.props.auth.user} />
        <Hero />
        <NowShowing />
        <ComingMovies />
        <JoinMember />
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Home)
