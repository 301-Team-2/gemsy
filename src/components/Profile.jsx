import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      axios.get('/api/saved-locations')
        .then((response) => {
          setSavedLocations(response.data);
        })
        .catch((error) => {
          console.error('Error fetching saved locations:', error);
        });
    }
  }, [isAuthenticated, user]);

  return (
    <div>
      <h2>Profile</h2>
      {/* Display user information here */}
      {isAuthenticated && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      <h3>Saved Locations</h3>
      <ul>
        {savedLocations.map((location, index) => (
          <li key={index}>{location}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
