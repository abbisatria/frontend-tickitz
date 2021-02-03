import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRouteProfile extends Component {
  render () {
    const Component = this.props.privateComponent
    return (
      <Route {...this.props} render={(props) => {
          if (this.props.auth.token) {
            return <Component {...props} />
          } else {
            return <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
          }
      }}></Route>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
})

export default connect(mapStateToProps)(PrivateRouteProfile)
