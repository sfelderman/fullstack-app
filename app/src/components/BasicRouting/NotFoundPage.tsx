import React from 'react';
import { Link } from 'react-router-dom';
import { HOMEPAGE_ROUTE } from '../../constants';

export default () => (
  <div className='container'>
    <div className='row'>
      <div className='col-md-12 text-center'>
        <div className='error-template'>
          <h1>Oops!</h1>
          <h2>404 Not Found</h2>
          <div className='error-details'>
            Sorry, an error has occurred, Requested page not found!
          </div>
          <div className='error-actions'>
            <Link className='btn btn-primary btn-lg' to={HOMEPAGE_ROUTE}>
              Back to the HomePage
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
