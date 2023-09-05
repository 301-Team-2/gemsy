import React, { useState } from 'react';
import axios from 'axios';
import { useLocationContext } from "./LocationContext"; // Use relative import


function SearchDates() {
  // State for search form inputs
  const [searchFormData, setSearchFormData] = useState({ location: '' });

  // State for search results
  const [restaurantResults, setRestaurantResults] = useState([]);
  const [eventResults, setEventResults] = useState([]);

  // Access the addLocation function from the context
  const { addLocation } = useLocationContext();

  // Function to handle search form submission
  const handleSearch = async () => {
    try {
      const restaurantApiUrl = `${import.meta.env.VITE_BACKEND_URL}/restaurants`;
      const eventApiUrl = `${import.meta.env.VITE_BACKEND_URL}/events`; // Use the endpoint for events

      const [restaurantResponse, eventResponse] = await Promise.all([
        axios.get(restaurantApiUrl, {
          params: {
            searchQuery: searchFormData.location,
          },
        }),
        axios.get(eventApiUrl, {
          params: {
            searchQuery: searchFormData.location,
          },
        }),
      ]);

      const restaurantData = restaurantResponse.data;
      const eventData = eventResponse.data;

      setRestaurantResults(restaurantData);
      setEventResults(eventData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle saving a location
  const handleSaveLocation = (location) => {
    addLocation(location); // Use the addLocation function from the context
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
          onChange={(e) => setSearchFormData({ location: e.target.value })}
        />
      </div>

      <button onClick={handleSearch}>Search</button>

      <div>
        {/* Display restaurant search results */}
        <h2>Restaurants</h2>
        {restaurantResults.map((restaurant, index) => (
          <div key={index}>
            <h3><a href={restaurant.url} target="_blank" rel="noopener noreferrer">{restaurant.name}</a></h3>
            <img src={restaurant.image_url} className="restaurant-img" alt="restaurant-img" />
            <p>Rating: {restaurant.rating}</p>
            <p>Price: {restaurant.price}</p>
            <p>Location:{restaurant.location}</p>
            <button onClick={() => handleSaveLocation(restaurant.location)}>Save Location</button>
          </div>
        ))}
      </div>

      <div>
        {/* Display event search results */}
        <h2>Events</h2>
        {eventResults.map((event, index) => (
          <div key={index}>
            <h3><a href={event.event_site_url} target="_blank" rel="noopener noreferrer">{event.name}</a></h3>
            <img src={event.image_url} className="event-img" alt="event-img" />
            <p>Description: {event.description}</p>
            <p>Start Time: {event.time_start}</p>
            <p>End Time: {event.time_end}</p>
            <button onClick={() => handleSaveLocation(event.location)}>Save Location</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchDates;
