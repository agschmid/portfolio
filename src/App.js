import './App.css';
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import About from './About';
import Contact from './Contact';
import Home from './Home';

class App extends React.Component {
  render() {
      return (
        <div className="App">
          <div>
            <nav>
              <ul id="navigation">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
                <li>
                <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/about/" element={<About />}></Route>
              <Route path="/contact/" element={<Contact />}></Route>

            </Routes>
          </div>
            );
  }
}

export default App;