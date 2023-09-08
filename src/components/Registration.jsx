import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Register() {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = () => {
    loginWithRedirect({ screen_hint: 'signup' });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <p>Click the button below to create an account using Auth0</p>
      <button onClick={handleSignUp}>Sign Up with Auth0</button>
    </div>
  );
}

export default Register;
