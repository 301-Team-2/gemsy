import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LocationContext = createContext();

export function useLocationContext() {
  return useContext(LocationContext);
}

export function LocationProvider({ children }) {
  const [savedLocations, setSavedLocations] = useState([]);

  const addLocation = (location) => {
    setSavedLocations([...savedLocations, location]);
  };

  const removeLocation = (index) => {
    const updatedLocations = [...savedLocations];
    updatedLocations.splice(index, 1);
    setSavedLocations(updatedLocations);
  };

  return (
    <LocationContext.Provider
      value={{
        savedLocations,
        addLocation,
        removeLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
