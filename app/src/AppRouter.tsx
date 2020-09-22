import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotFoundPage, ScrollToTop, LandingPage } from './components/BasicRouting';
// import ScrollToTop from './components/ScrollToTop';
import { HOMEPAGE_ROUTE, LOGIN_ROUTE, SIGN_UP_ROUTE } from './constants';
// import LoginScreen from './components/LoginScreen';
// import SignUpScreen from './components/SignUpScreen';
import LoginButton from './components/auth/LoginButton';
// import LogoutButton from './components/auth/LogoutButton';
import Profile from './components/Profile';

export default () => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <Route path='/' component={Profile} exact={true} />
        <Route path='/login' component={LoginButton} exact={true} />
        <Route path='/logout' component={() => <div>Logged Out</div>} exact={true} />
        {/* <Route path={HOMEPAGE_ROUTE} component={LandingPage} exact={true} /> */}
        {/* <Route path={LOGIN_ROUTE} component={LoginScreen} /> */}
        {/* <Route path={SIGN_UP_ROUTE} component={SignUpScreen} /> */}
        <Route component={NotFoundPage} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);
