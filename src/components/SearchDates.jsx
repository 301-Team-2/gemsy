import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function SearchDates() {
  const [searchFormData, setSearchFormData] = useState({ location: '' });
  const [restaurantResults, setRestaurantResults] = useState([]);
  const [eventResults, setEventResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle search form submission
  const handleSearch = async () => {
    try {
      const restaurantApiUrl = `${import.meta.env.VITE_BACKEND_URL}/restaurants`;
      const eventApiUrl = `${import.meta.env.VITE_BACKEND_URL}/events`;
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
      // Show the results
      setShowResults(true);
      // Close the modal after search
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle saving a location
  const handleSaveLocation = () => {
  };

  useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Search for Date Ideas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Location:</label>
          <input
            className="location-input"
            type="text"
            placeholder="Enter location"
            value={searchFormData.location}
            onChange={(e) =>
              setSearchFormData({ location: e.target.value })
            }
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {showResults && (
        <>
          <div className='show-restaurants'>
            {/* Display restaurant search results */}
            <h2>Restaurants</h2>
            {restaurantResults.map((restaurant, index) => (
              <div key={index}>
                <h3><a href={restaurant.url} target="_blank" rel="noopener noreferrer">{restaurant.name}</a></h3>
                <img src={restaurant.image_url} className="restaurant-img" alt="restaurant-img" />
                <p>Rating: {restaurant.rating}</p>
                <p>Price: {restaurant.price}</p>
                <p>Location:{restaurant.location}</p>
                <button className='search-btn' onClick={() => handleSaveLocation(restaurant.location)}>Save Location</button>
              </div>
            ))}
          </div>

          <div className='show-events'>
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
        </>
      )}
    </>
  );
}
export default SearchDates;
