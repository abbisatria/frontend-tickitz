import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import persistedStore from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import Home from '../pages/Home/Home'
import SignUp from '../pages/Auth/SignUp/SignUp'
import SignIn from '../pages/Auth/SignIn/SignIn'
import ForgotPassword from '../pages/Auth/ForgotPassword/ForgotPassword'
import Details from '../pages/Details/Details'
import Order from '../pages/Order/Order'
import Payment from '../pages/Payment/Payment'
import Ticket from '../pages/Ticket/Ticket'
import Profile from '../pages/Profile/Profile'
import Admin from '../pages/Admin/Admin'
import ScrollToTop from '../ScrollToTop'
import PrivateRoute from './PrivateRoute'
import PrivateRouteProfile from './PrivateRouteProfile'
import PrivateRouteAdmin from './PrivateRouteAdmin'
import Not_Found from '../pages/Not_Found'

class Router extends Component {
  render () {
    const { store, persistor } = persistedStore()
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <BrowserRouter>
        <ScrollToTop />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/forgot-password/:token" component={ForgotPassword} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/details/:id" component={Details} />
            <PrivateRouteAdmin path="/admin" privateComponent={Admin} />
            <PrivateRouteProfile path="/profile" privateComponent={Profile} />
            <PrivateRoute path='/order' privateComponent={Order} />
            <PrivateRoute path='/payment' privateComponent={Payment} />
            <PrivateRoute path='/ticket' privateComponent={Ticket} />
            <Route component={Not_Found} />
          </Switch>
        </BrowserRouter>
        </PersistGate>
      </Provider>
    )
  }
}

export default Router
