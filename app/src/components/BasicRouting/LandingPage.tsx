import React from 'react';
import { Redirect } from 'react-router-dom';
import { PENDING, LOGGED_IN, LOGIN_ROUTE, LOGGED_OUT } from '../../constants';
import { Spinner } from '../common';
import Homepage from '../Homepage';

const LandingPage = ({ authStatus = LOGGED_IN }) => {
  switch (authStatus) {
    case PENDING: //TODO turn this into a splash screen
      return <Spinner message={'Loading App'} />;
    case LOGGED_OUT:
      return <Redirect to={LOGIN_ROUTE} />;
    default:
      // LOGGED_IN
      return <Homepage />;
  }
};

export default LandingPage;
