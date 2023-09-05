import React, { useState, useEffect } from 'react';
import openai from 'openai';
import axios from 'axios';
import mongoose from 'mongoose';

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

  // API URL
  const apiURL = `${import.meta.env.VITE_BACKEND_URL}/events`;

  // Function to handle search form submission
  const handleSearch = async () => {
    try {
      const response = await axios.post(apiURL, searchFormData);
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
  const handleSaveSearch = async () => {
    try {
      await axios.post(apiURL, searchFormData);
      setSavedSearches([...savedSearches, searchFormData]);
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  // Function to handle generating suggestions based on user prompts
  const handlePromptSubmit = async () => {
    try {
      if (prompt.trim() !== '') {
        const recommendations = await getAIRecommendations(prompt);
        setSearchSuggestions(recommendations);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to send prompts to GPT-3 and get suggestions
  const getAIRecommendations = async (userPrompt) => {
    try {
      const openaiApiKey = import.meta.env.OPENAI_API_KEY;

      const gptResponse = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: userPrompt,
        max_tokens: 50,
      }, {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
      });

      const generatedText = gptResponse.data.choices[0].text;

      const yelpApiKey = import.meta.env.YELP_API_KEY;

      const yelpResponse = await axios.get('https://api.yelp.com/v3/businesses/search', {
        params: {
          location: searchFormData.location,
          term: generatedText,
        },
        headers: {
          'Authorization': `Bearer ${yelpApiKey}`,
        },
      });

      const suggestions = yelpResponse.data.businesses;

      return suggestions;
    } catch (error) {
      console.error('Error:', error);
      return [];
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
      <div
