import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import SearchDates from './components/SearchDates';
import Profile from './components/Profile';
import About from './components/About';
import ChatGPT from './components/ChatGPT';

class App extends React.Component {
  render() {
    return (
      <>
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
      </>
    )
  }
}

export default App;
