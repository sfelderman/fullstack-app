import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotFoundPage, ScrollToTop, LandingPage } from './components/BasicRouting';
// import ScrollToTop from './components/ScrollToTop';
import { HOMEPAGE_ROUTE, LOGIN_ROUTE, SIGN_UP_ROUTE } from './constants';
// import LoginScreen from './components/LoginScreen';
// import SignUpScreen from './components/SignUpScreen';

export default () => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <Route path={HOMEPAGE_ROUTE} component={LandingPage} exact={true} />
        {/* <Route path={LOGIN_ROUTE} component={LoginScreen} /> */}
        {/* <Route path={SIGN_UP_ROUTE} component={SignUpScreen} /> */}
        <Route component={NotFoundPage} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);
