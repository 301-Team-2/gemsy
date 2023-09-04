import React from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import SearchDates from './SearchDates';
import Profile from './components/Profile';
import About from './components/About';

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
              path="./components/Profile.jsx" 
              element={<Profile />} 
            />
            <Route 
              path="./components/About.jsx"
              element={<About />}
            />
          </Routes>
        </Router>
      </>
    )
  }
}

export default App;