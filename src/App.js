import './App.css';
import { React, useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import About from './About';
import Projects from './Projects';
import Sonic from './Sonic';



export default function App () {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);


      return (
        <div className="App">
          <header>
            <div id='home'>
              <div id='name'>Adrian<br/>Schmidt</div>
              <div id='title'>creative<br/>technologist</div>
            </div>
            <nav>
              <ul id="navigation">
                <li className={useLocation().pathname==='/' ? 'highlighted': 'nothighlighted'}>
                <Link to="/">about</Link>
                </li>
                <li className={useLocation().pathname==='/projects' ? 'highlighted': 'nothighlighted'}>
                <Link to="/projects">projects</Link>
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
            <Route exact path="/" element={<About />} />
            <Route path="/projects/" element={<Projects />} />
            <Route path="/projects/sonic" element={<Sonic />} />

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