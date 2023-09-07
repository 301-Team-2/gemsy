import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Card } from 'react-bootstrap';


function SearchDates() {
  const [restaurantSearchData, setRestaurantSearchData] = useState({ location: '' });
  const [eventSearchData, setEventSearchData] = useState({ location: '' });
  const [restaurantResults, setRestaurantResults] = useState([]);
  const [eventResults, setEventResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openEventDetailsModal = (event) => {
    setSelectedEvent(event);
  };

  const closeEventDetailsModal = () => {
    setSelectedEvent(null);
  };

  const handleRestaurantSearch = async () => {
    try {
      const restaurantApiUrl = `${import.meta.env.VITE_BACKEND_URL}/restaurants`;
      const restaurantResponse = await axios.get(restaurantApiUrl, {
        params: {
          searchQuery: restaurantSearchData.location,
        },
      });
      const restaurantData = restaurantResponse.data;
      setRestaurantResults(restaurantData);
      setEventResults([]); // Clear event results
      setShowResults(true);
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  const handleEventSearch = async () => {
    try {
      const eventApiUrl = `${import.meta.env.VITE_BACKEND_URL}/events`;
      const eventResponse = await axios.get(eventApiUrl, {
        params: {
          searchQuery: eventSearchData.location,
        },
      });
      const eventData = eventResponse.data;
      setEventResults(eventData);
      setRestaurantResults([]); // Clear restaurant results
      setShowResults(true);
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle saving a location
  const handleSaveLocation = (location) => {
    console.log('Location saved:', location);
  };

  useEffect(() => {
    openModal();
  }, []);

  const renderEventDescription = (description) => {
    return { __html: description };
  };

  return (
    <>
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Search for Date Ideas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='restaurants-search'>
            <label>Search for Restaurants:</label> 
              <input
                className="location-input"
                type="text"
                placeholder="Enter location"
                value={restaurantSearchData.location}
                onChange={(e) =>
                  setRestaurantSearchData({ location: e.target.value })
                }
              />
              <button className="search-btn" onClick={handleRestaurantSearch}>
                Search Restaurants
              </button>
          </div>
          <div className='events-search'>
            <label>Search for Events:</label>
              <input
                className="location-input"
                type="text"
                placeholder="Enter location"
                value={eventSearchData.location}
                onChange={(e) =>
                  setEventSearchData({ location: e.target.value })
                }
              />
              <button className="search-btn" onClick={handleEventSearch}>
                Search Events
              </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {showResults && (
        <>
          {restaurantResults.length > 0 && (
            <div className='show-restaurants'>
              <h2>Restaurants</h2>
                <div className='cards'>
                  {restaurantResults.map((restaurant, index) => (
                    <Card key={index}>
                      <Card.Img variant="top" src={restaurant.image_url} alt="restaurant-img" />
                      <Card.Body>
                        <Card.Title>
                          <a href={restaurant.url} target="_blank" rel="noopener noreferrer">
                            {restaurant.name}
                          </a>
                        </Card.Title>
                        <Card.Text>
                          Rating: {restaurant.rating}
                        </Card.Text>
                        <Card.Text>
                          Price: {restaurant.price}
                        </Card.Text>
                        <Card.Text>
                          Location: {restaurant.location}
                        </Card.Text>
                        <Button variant="primary" onClick={() => handleSaveLocation(restaurant.location)}>Save Location</Button>
                      </Card.Body>
                    </Card>
                  ))}
                </div> 
              </div>
            )}

          {eventResults.length > 0 && (
            <div className='show-events'>
              <h2>Events</h2>
              <div className='cards'>
                {eventResults.map((event, index) => (
                  <Card key={index}>
                    <Card.Img variant="top" src={event.image_url} alt="event-img" />
                    <Card.Body>
                      <Card.Title>
                          {event.name}
                      </Card.Title>
                      <Card.Text>
                        {/* Render event description with HTML
                        <div dangerouslySetInnerHTML={renderEventDescription(event.description)} /> */}
                      </Card.Text>
                      <Card.Text>
                        Start Time: {event.time_start}
                      </Card.Text>
                      <Card.Text>
                        End Time: {event.time_end}
                      </Card.Text>
                      <Button variant="primary" onClick={() => openEventDetailsModal(event)}>See More</Button>
                      <Button variant="primary" onClick={() => handleSaveLocation(event.location)}>Save Location</Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          )}
          <button className="search-again-btn" onClick={openModal}>
            Search Again
          </button>
        </>
      )}

      {/* Modal for displaying event details */}
      <Modal show={selectedEvent !== null} onHide={closeEventDetailsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="scrollable-modal">
          {selectedEvent && (
            <>
              <h3>{selectedEvent.name}</h3>
              <div dangerouslySetInnerHTML={renderEventDescription(selectedEvent.description)} />
              <p>
                <a href={selectedEvent.event_site_url} target="_blank" rel="noopener noreferrer">
                  Click Here for the Event Link
                </a>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEventDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchDates;
