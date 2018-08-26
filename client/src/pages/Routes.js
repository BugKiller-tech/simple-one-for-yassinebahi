import React, { Component } from 'react';
import { Router, Route, BrowserRouter, Switch } from 'react-router-dom';

import Login from './Login';
import MainPage from './MainPage';
import DashboardMain from './DashboardMain';

class Routes extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/dashboard' component={DashboardMain} />



          <Route path='/' component={MainPage} />
          {/* <Route path='/' component={MainPage} /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routes