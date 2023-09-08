import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Logout() {
  const { logout } = useAuth0();

  return (
    <div>
      <button onClick={() => logout()}>Logout from Gemsy</button>
    </div>
  );
}

export default Logout;
