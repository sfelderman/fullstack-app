import React from 'react';
import './Spinner.css';

type Spinner = { message: string; children?: JSX.Element };

const Spinner = ({ message, children }: { message: string; children?: JSX.Element }) => (
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
