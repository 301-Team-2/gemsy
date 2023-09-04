import React from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Profile from './Profile';
import SearchDates from './SearchDates';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<SearchDates />}
            />
            <Route 
              path="/About"
              element={<About />}
            />
            <Route path="/profile" 
            element={<Profile />} 
            />
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;