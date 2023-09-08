// Login.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <button className='login-btn' onClick={() => loginWithRedirect()}>Login to Gemsy</button>
    </div>
  );
}

export default Login;

