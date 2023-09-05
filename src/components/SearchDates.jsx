import React, { useState, useEffect } from 'react';
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

  // State for search suggestions
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  // State for user prompts
  const [prompt, setPrompt] = useState('');

  // Function to handle search form submission
  const handleSearch = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/events`;
      // Placeholder for API call to search for date ideas based on searchFormData
      // Replace with actual API call
      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(searchFormData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await apiResponse.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle selecting a date idea
  const handleSelectDateIdea = (dateIdea) => {
    setSelectedDateIdea(dateIdea);
  };

  // Function to save a search
  const handleSaveSearch = () => {
    setSavedSearches([...savedSearches, searchFormData]);
  };

  // Function to call the backend API for Yelp suggestions
  const getAIRecommendations = async (userPrompt) => {
    try {
      const openaiApiKey = import.meta.env.OPENAI_API_KEY;

      // Make a request to your backend API endpoint
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/yelp-businesses`, {
        params: {
          location: searchFormData.location,
          term: userPrompt, // Pass the user's input as the search term
        },
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      });

      const suggestions = response.data;
      setSearchSuggestions(suggestions);
    } catch (error) {
      console.error('Error:', error);
      setSearchSuggestions([]);
    }
  };

  // Function to handle generating suggestions based on user prompts
  const handlePromptSubmit = async () => {
    try {
      if (prompt.trim() !== '') {
        await getAIRecommendations(prompt);
      }
    } catch (error) {
      console.error('Error:', error);
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
        <h2>Search Suggestions:</h2>
        <ul>
          {searchSuggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>

      {/* Prompt input and button */}
      <div>
        <label>Ask for suggestions:</label>
        <input
          type="text"
          placeholder="Type here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handlePromptSubmit}>Get Suggestions</button>
      </div>

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

