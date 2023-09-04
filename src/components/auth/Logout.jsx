import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Logout() {
  const { logout } = useAuth0();

  return (
    <div>
      <h2>Logout from Gemsy</h2>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default Logout;
