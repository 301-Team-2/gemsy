import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useLocationContext } from "./LocationContext"; // Use relative import


function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const { savedLocations, removeLocation } = useLocationContext();

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleRemoveLocation = (index) => {
    removeLocation(index); // Use the removeLocation function from the context
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <img src={user.picture} alt={user.name} />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <h3>Saved Locations</h3>
      <ul>
        {savedLocations.map((location, index) => (
          <li key={index}>
            {location}
            <button onClick={() => handleRemoveLocation(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
