import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <h1 style={{ fontFamily: 'satisfy', fontSize: '54px' }}>Hi there!</h1>
      <p style={{ fontFamily: 'mate', fontSize: '24px', color: 'grey' }}>Click the button below to login!</p>
      <div className="d-flex justify-content-center">
        <button type="button" size="lg" className="copy-btn sign-in-btn" onClick={signIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Signin;
