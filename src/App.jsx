import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import SearchDates from "./components/SearchDates";
import Profile from "./components/Profile";
import { Auth0Provider } from "@auth0/auth0-react";
import About from "./components/About";
import ChatGPT from "./components/ChatGPT";

class App extends React.Component {
  render() {
    return (
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <Router>
          <Header />
          <hr />
          <Routes>
            <Route 
              exact path="/"
              element={<SearchDates />}
            />
            <Route
              exact path="/chat"
              element={<ChatGPT/>}
            />
            <Route 
              path="/profile"
              element={<Profile />} 
            />
            <Route 
              path="/about"
              element={<About />}
            />
          </Routes>
          <hr />
          <Footer />
        </Router>
      </Auth0Provider>
    );
  }
}

export default App;
