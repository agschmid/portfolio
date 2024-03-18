import React, {useState, useEffect, useRef} from 'react';
import { Link, useLocation } from "react-router-dom";
import Pointer from './assets/Pointer.js'; // Import the SVG file

export default function Projects(){   
    const scrollRef = useRef(null);

    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");
    const [currentProject, setCurrentProject] = useState("");
    const [scrollerShowing, setScrollerShowing] = useState('true')
    const [scrollerColor, setScrollerColor] = useState('#FCFCFC')

    const enterScroll = () => {
        setScrollerColor('#D9D9D9')
      };
    
    const leaveScroll = () => {
    setScrollerColor('#FCFCFC')
    };

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname){
            setTransistionStage("fadeOut");
        } 
    }, [location, displayLocation]);
    
    useEffect(() => {

        const handleWheel = (event) => {
            const container = scrollRef.current;
            // Calculate the new scrollTop value based on the wheel delta
            const delta = event.deltaY || event.detail || event.wheelDelta;
            const newScrollTop = container.scrollTop + delta;

            // Calculate the maximum scroll height
            const maxScrollHeight = container.scrollHeight - container.clientHeight;

            // Limit the new scrollTop value to the maximum scroll height
            const limitedScrollTop = Math.max(0, Math.min(maxScrollHeight, newScrollTop));

            limitedScrollTop === maxScrollHeight ? setScrollerShowing(false) : setScrollerShowing(true);
                
            container.scrollTop = limitedScrollTop;
        };
      
        // Add event listener to the container for the 'wheel' event
        document.addEventListener('wheel', handleWheel, { passive: false });
    
        // Clean up the event listener when the component unmounts
        return () => {
        document.removeEventListener('wheel', handleWheel);
        };
    }, []); // Empty dependency array ensures this effect runs only once
      

    // Function to handle hover state change
    const handleHover = (title) => {
        setCurrentProject(title);
    };

    const displayNone = () => {
        setCurrentProject("");
    };


    const scrollMore = () => {
        const container = scrollRef.current;
        const newScrollTop = scrollerShowing ? container.scrollTop + container.clientHeight : 0;
        const maxScrollHeight = container.scrollHeight - container.clientHeight;

        const limitedScrollTop = Math.max(0, Math.min(maxScrollHeight, newScrollTop));

        limitedScrollTop === maxScrollHeight ? setScrollerShowing(false) : setScrollerShowing(true);
        container.scrollTo({
            top: limitedScrollTop,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`${transitionStage} body`}
        onAnimationEnd={() => {
          if (transitionStage === "fadeOut") {
            setTransistionStage("fadeIn");
            setDisplayLocation(location);
          }
        }}>

            <div className='body-left lower-align'>
                {/* <img src={process.env.PUBLIC_URL + '/assets/temp.png'} alt='temp' className='portfolio-image'></img> */}
                <div className='portfolio-preview'>
                    <div className = 'portfolio-preview-title'>{currentProject}</div>
                    <div className = 'portfolio-preview-description'>description</div>
                </div>
            </div>

            <div className='body-right projects firefox-scroll' ref={scrollRef}>
                <div className='project-header-parent'><h3 className='project-header'>Professional Work</h3><div className='project-count'>7</div></div>
                <ul className='project-list' style={{marginBottom: "40px"}}>
                    <Link to="/projects/sonic" onMouseEnter={(e) => handleHover("SONIC MUTATIONS")} onMouseLeave={displayNone}><li>Sonic Mutations</li></Link>
                    <Link to="/projects/sonic" onMouseEnter={(e) => handleHover("SYSTEM OF A SOUND")} onMouseLeave={displayNone}><li>System of a Sound</li></Link>
                    <Link to="/projects/sonic"><li>PANIC!</li></Link>
                    <Link to="/projects/sonic"><li>Cybernetic Star Coasters</li></Link>
                    <Link to="/projects/sonic"><li>Futures Spinner</li></Link>
                    <Link to="/projects/sonic"><li>Australian Cybernetic Interactive Poster</li></Link>
                    <Link to="/projects/sonic"><li>Woroni Magazine Designs</li></Link>
                </ul>
                <div className='project-header-parent'><h3 className='project-header'>Personal Work</h3><div className='project-count'>10</div></div>
                <ul className='project-list'>
                    <Link to="/projects/sonic"><li>Machine Learning Bechdel Test</li></Link>
                    <Link to="/projects/sonic"><li>Laser Cut Iris</li></Link>
                    <Link to="/projects/sonic"><li>Quantum Phonon Research</li></Link>
                    <Link to="/projects/sonic"><li>Ping 3D Web Game</li></Link>
                    <Link to="/projects/sonic"><li>Autonomous Scooter Interface</li></Link>
                    <Link to="/projects/sonic"><li>Baking</li></Link>
                    <Link to="/projects/sonic"><li>Backwash Homepage</li></Link>
                    <Link to="/projects/sonic"><li>Arduino Doodle Jump</li></Link>
                    <Link to="/projects/sonic"><li>Smart Loading Zones</li></Link>
                    <Link to="/projects/sonic"><li>Habit Helper</li></Link>
                </ul>

                <div onClick={scrollMore} onMouseEnter={enterScroll} onMouseLeave={leaveScroll} className='pointerParent'>
                    <Pointer  color={scrollerColor} rotation = {scrollerShowing ? 'showPointer' : 'hidePointer'}></Pointer>
                </div>
                
            </div>
        </div>

    )
}

