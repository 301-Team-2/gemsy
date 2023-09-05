import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Register() {
  const { loginWithRedirect } = useAuth0();

  const handleRegister = () => {
    loginWithRedirect();
  };

  return (
    <div>
      <h2>Register</h2>
      <p>Click the button below to register using Auth0</p>
      <button onClick={handleRegister}>Register with Auth0</button>
    </div>
  );
}

export default Register;
