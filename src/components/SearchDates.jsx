import React, { useState } from 'react';
import axios from 'axios';

function SearchDates() {
  // State for search form inputs
  const [searchFormData, setSearchFormData] = useState({ location: '', preferences: '' });

  // State for search results
  const [searchResults, setSearchResults] = useState([]);

  // State for selected date idea details
  const [selectedDateIdea, setSelectedDateIdea] = useState(null);

  // State for saved searches
  const [savedSearches, setSavedSearches] = useState([]);

  // Function to handle search form submission
  const handleSearch = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/events`, searchFormData);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle selecting a date idea
  const handleSelectDateIdea = (dateIdea) => {
    setSelectedDateIdea(dateIdea);
  };

  // Function to save a search
  const handleSaveSearch = async() => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/events`, searchFormData);
      setSavedSearches([...savedSearches, searchFormData]);
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  return (
    <div>
      <h2>Search for Date Ideas</h2>
      <div>
        <label>Location:</label>
        <input
          type="text"
          placeholder="Enter location"
          value={searchFormData.location}
          onChange={(e) => setSearchFormData({ ...searchFormData, location: e.target.value })}
        />
      </div>
      <div>
        <label>Preferences:</label>
        <input
          type="text"
          placeholder="Enter preferences"
          value={searchFormData.preferences}
          onChange={(e) => setSearchFormData({ ...searchFormData, preferences: e.target.value })}
        />
      </div>
      <button onClick={handleSearch}>Search</button>

      <div>
        {/* Display search results */}
        {searchResults.map((dateIdea) => (
          <div key={dateIdea.id}>
            <h3>{dateIdea.title}</h3>
            <p>{dateIdea.description}</p>
            <button onClick={() => handleSelectDateIdea(dateIdea)}>View Details</button>
          </div>
        ))}
      </div>

      {selectedDateIdea && (
        <div>
          {/* Display selected date idea details */}
          <h2>Date Idea Details</h2>
          <h3>{selectedDateIdea.title}</h3>
          <p>{selectedDateIdea.description}</p>
          <button onClick={handleSaveSearch}>Save Search</button>
        </div>
      )}

      <div>
        {/* Display saved searches */}
        <h2>Saved Searches</h2>
        {savedSearches.map((search, index) => (
          <div key={index}>
            <p>Location: {search.location}</p>
            <p>Preferences: {search.preferences}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchDates;

