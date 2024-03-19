import './App.css';
import { React, useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import About from './About';
import Projects from './Projects';
import Sonic from './Sonic';
import System from './System';

// import ReactGA from "react-ga4";
// ReactGA.initialize('G-MSPZLVKWK8');




export default function App () {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");
  const [backgroundColor, setBackgroundColor] = useState("#FCFCFC")

  useEffect(() => {
    // Set the background color of the entire HTML document
    document.documentElement.style.backgroundColor = backgroundColor; // Set your desired background color
    return () => {
      // Reset background color when component unmounts
      document.documentElement.style.backgroundColor = '';
    };
  }, [backgroundColor]); // Empty dependency array ensures this effect runs only once


  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

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
              <ul id="navigation">
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
            className={`${transitionStage} body`}
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









// // TODO - try to get this one working
// import { createRef } from 'react'

// const routes = [
//   { path: '/', name: 'Home', element: <Home />, nodeRef: createRef() },
//   { path: '/about', name: 'About', element: <About />, nodeRef: createRef() },
//   {
//     path: '/contact',
//     name: 'Contact',
//     element: <Contact />,
//     nodeRef: createRef(),
//   },
// ]

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Example />,
//     children: routes.map((route) => ({
//       index: route.path === '/',
//       path: route.path === '/' ? undefined : route.path,
//       element: route.element,
//     })),
//   },
// ])

// function Example() {
//   const location = useLocation()
//   const currentOutlet = useOutlet()
//   const { nodeRef } =
//     routes.find((route) => route.path === location.pathname) ?? {}
//   return (
//     <>
//       <Navbar bg="light">
//         <Nav className="mx-auto">
//           {routes.map((route) => (
//             <Nav.Link
//               key={route.path}
//               as={NavLink}
//               to={route.path}
//               className={({ isActive }) => (isActive ? 'active' : undefined)}
//               end
//             >
//               {route.name}
//             </Nav.Link>
//           ))}
//         </Nav>
//       </Navbar>
//       <Container className="container">
//         <SwitchTransition>
//           <CSSTransition
//             key={location.pathname}
//             nodeRef={nodeRef}
//             timeout={300}
//             classNames="page"
//             unmountOnExit
//           >
//             {(state) => (
//               <div ref={nodeRef} className="page">
//                 {currentOutlet}
//               </div>
//             )}
//           </CSSTransition>
//         </SwitchTransition>
//       </Container>
//     </>
//   )
// }