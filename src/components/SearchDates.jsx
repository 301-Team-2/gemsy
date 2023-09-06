import React, { Component } from 'react';
import axios from 'axios';
import { useLocationContext } from "./LocationContext"; // Use relative import
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button components
import { useLocationContext } from "./LocationContext";

class SearchDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFormData: { location: '' },
      restaurantResults: [],
      eventResults: [],
      showResults: false,
      showModal: false,
    };
  }

function SearchDates() {
  // State for search form inputs
  const [searchFormData, setSearchFormData] = useState({ location: '' });

  // State for search results
  const [restaurantResults, setRestaurantResults] = useState([]);
  const [eventResults, setEventResults] = useState([]);

  // Access the addLocation function from the context
  const { addLocation } = useLocationContext();
  
  // Function to open the modal
  openModal = () => {
    this.setState({ showModal: true });
  };

  // Function to close the modal
  closeModal = () => {
    this.setState({ showModal: false });
  };

  // Function to handle search form submission
  handleSearch = async () => {
    try {
      const restaurantApiUrl = `${import.meta.env.VITE_BACKEND_URL}/restaurants`;
      const eventApiUrl = `${import.meta.env.VITE_BACKEND_URL}/events`;

      const [restaurantResponse, eventResponse] = await Promise.all([
        axios.get(restaurantApiUrl, {
          params: {
            searchQuery: this.state.searchFormData.location,
          },
        }),
        axios.get(eventApiUrl, {
          params: {
            searchQuery: this.state.searchFormData.location,
          },
        }),
      ]);

      const restaurantData = restaurantResponse.data;
      const eventData = eventResponse.data;

      setRestaurantResults(restaurantData);
      setEventResults(eventData);

      this.setState({
        restaurantResults: restaurantData,
        eventResults: eventData,
        showResults: true,
      });

      // Close the modal after search
      this.closeModal();

    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle saving a location
  handleSaveLocation = (location) => {
    addLocation(location);
  };

  render() {
    return (
      <>
        <Modal show={this.state.showModal} onHide={this.closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Search for Date Ideas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Location:</label>
            <input
              className="location-input"
              type="text"
              placeholder="Enter location"
              value={this.state.searchFormData.location}
              onChange={(e) =>
                this.setState({
                  searchFormData: { location: e.target.value },
                })
              }
            />
            <button className="search-btn" onClick={this.handleSearch}>
              Search
            </button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Show Results
            </Button>
          </Modal.Footer>
        </Modal>

        {this.state.showResults && (
          <>
            <div className='show-restaurants'>
              {/* Display restaurant search results */}
              <h2>Restaurants</h2>
              {this.state.restaurantResults.map((restaurant, index) => (
                <div key={index}>
                  <h3>
                    <a
                      href={restaurant.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {restaurant.name}
                    </a>
                  </h3>
                  <img
                    src={restaurant.image_url}
                    className="restaurant-img"
                    alt="restaurant-img"
                  />
                  <p>Rating: {restaurant.rating}</p>
                  <p>Price: {restaurant.price}</p>
                  <p>Location:{restaurant.location}</p>
                  <button
                    className='search-btn'
                    onClick={() => this.handleSaveLocation(restaurant.location)}
                  >
                    Save Location
                  </button>
                </div>
              ))}
            </div>
            <div className='show-events'>
              {/* Display event search results */}
              <h2>Events</h2>
              {this.state.eventResults.map((event, index) => (
                <div key={index}>
                  <h3>
                    <a
                      href={event.event_site_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {event.name}
                    </a>
                  </h3>
                  <img
                    src={event.image_url}
                    className="event-img"
                    alt="event-img"
                  />
                  <p>Description: {event.description}</p>
                  <p>Start Time: {event.time_start}</p>
                  <p>End Time: {event.time_end}</p>
                  <button
                    onClick={() => this.handleSaveLocation(event.location)}
                  >
                    Save Location
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    );
  }
}

export default SearchDates;
