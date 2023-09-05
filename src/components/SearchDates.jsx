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

  // Function to handle search form submission
  const handleSearch = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/search-dates`;
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

      // Use the OpenAI GPT-3 API to get search suggestions
      const userQuery = searchFormData.preferences;
      const { Schema } = mongoose;
  
      // Define a schema for your documents (adjust this according to your document structure)
      const documentSchema = new Schema({
        content: String, // The content of the document
      });
  
      // Create a model for your documents
      const Document = mongoose.model('Document', documentSchema);
  
      // Fetch documents from MongoDB
      const documents = await Document.find().lean(); // Use .lean() to get plain JavaScript objects
  
      // Extract the content of the documents into an array
      const documentContents = documents.map((doc) => doc.content);
  
      // Use the OpenAI GPT-3 API to get search suggestions
      const openaiResponse = await openai.search.suggestions({
        documents: documentContents, // Use the content of the documents
        query: userQuery,
      });
  
      // Handle the OpenAI response and update the search results or suggestions UI as needed
      const suggestions = openaiResponse.data.data;
  
      // Update the state with the search suggestions
      setSearchSuggestions(suggestions);
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
      <div>
        <label>Ask for suggestions:</label>
        <input
          type="text"
          placeholder="Ask for suggestions..."
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
