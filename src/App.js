import './css/App.css';
import './css/Fonts.css';
import './css/Scrollbar.css';

import { React, useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import About from './About';
import Projects from './Projects';
import Sonic from './Sonic';
import System from './System';

// Uncomment this for google tracking
// import ReactGA from "react-ga4";
// ReactGA.initialize('G-MSPZLVKWK8');


export default function App () {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");
  const [backgroundColor, setBackgroundColor] = useState("#FCFCFC")
  const [menuShowing, setMenuShowing] = useState(false);

  // Set the background color of the entire HTML document
  useEffect(() => {
    document.documentElement.style.backgroundColor = backgroundColor;
    return () => {
      document.documentElement.style.backgroundColor = '';
    };
  }, [backgroundColor]);

  // Animate out if the page changes
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) setTransistionStage("fadeOut");
    setMenuShowing(false);
  }, [location, displayLocation]);

  // // Google tracking for each apge
  // useEffect(() => {
  //   ReactGA.send({ hitType: "pageview", page: location.pathname, title: location.pathname });
  // }, [location]);

  return (
  <div className="App" style={{backgroundColor: backgroundColor}}>
    <header>
      <div id='home'>
        <div id='name'>Adrian<br/>Schmidt</div>
      </div>
      <nav>
      <div className="hamburger" onClick={() => setMenuShowing(!menuShowing)}>
        ☰
      </div>
      <ul id="navigation" className={menuShowing ? 'showNav' : ''}>
        <li className={useLocation().pathname.startsWith('/projects') ? 'left highlighted': 'left nothighlighted'}>
        <Link to="/projects">PROJECTS</Link>
        </li>
        <li className={useLocation().pathname==='/' ? 'right highlighted': 'right nothighlighted'}>
        <Link to="/">ABOUT ME</Link>
        </li>
      </ul>
      </nav>
    </header>
    <div
      className={`${transitionStage} allParent`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransistionStage("fadeIn");
          setDisplayLocation(location);
        }
      }}
    >
        <Routes location={displayLocation}>
          <Route exact path="/" element={<About backgroundColor = {backgroundColor} setBackgroundColor={setBackgroundColor}/>} />
          <Route path="/projects/" element={<Projects backgroundColor = {backgroundColor} setBackgroundColor={setBackgroundColor}/>} />
          <Route path="/projects/sonic" element={<Sonic backgroundColor = {backgroundColor} setBackgroundColor={setBackgroundColor}/>} />
          <Route path="/projects/system" element={<System backgroundColor = {backgroundColor} setBackgroundColor={setBackgroundColor}/>} />
        </Routes> 
      </div>
    </div>
  );
}