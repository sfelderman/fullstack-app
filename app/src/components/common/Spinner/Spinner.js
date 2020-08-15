import React from 'react';
import '../styles/Spinner.css';

const Spinner = ({ message, children }) => (
  <div className='loading-container'>
    <div className='loader-container d-flex justify-content-center'>
      <div className='loader'></div>
    </div>
    <div>
      <p className='text-center'>{message}</p>
      {children}
    </div>
  </div>
);

export default Spinner;
