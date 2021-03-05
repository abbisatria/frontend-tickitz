import React, { Component } from 'react'
import Header from '../../parts/Header/Header'
import Footer from '../../parts/Footer/Footer'
import MovieDescription from '../../parts/MovieDescription/MovieDescription'
import { connect } from 'react-redux'

class Admin extends Component {
  render () {
    return (
      <>
        <Header user={this.props.auth.user} />
        <MovieDescription />
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Admin)
