import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRouteAdmin extends Component {
  render () {
    const Component = this.props.privateComponent
    return (
      <Route {...this.props} render={(props) => {
          if (this.props.auth.user.role === 1) {
            return <Component {...props} />
          } else if (this.props.auth.token) {
            return <Redirect to='/' />
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

export default connect(mapStateToProps)(PrivateRouteAdmin)
