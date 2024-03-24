import React, {useState, useEffect, useRef} from 'react';
import { Link, useLocation } from "react-router-dom";
import Pointer from './assets/Pointer.js'; // Import the SVG file
import { darken } from 'polished';


export default function Projects(props){   
    const pageColor = "#FCFCFC"
    const setBackgroundColor = props.setBackgroundColor;
    const [elementColor, setElementColor] = useState("rgba(255,0,0,0)");

    useEffect(() => {
        setBackgroundColor(pageColor);
        const timer = setTimeout(() => {
            setElementColor(pageColor);
        }, 300);
        return () => clearTimeout(timer);
    }, [setBackgroundColor]);

    const scrollRef = useRef(null);
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");
    const [currentProject, setCurrentProject] = useState("");
    const [scrollerShowing, setScrollerShowing] = useState('true');
    const [scrollerColor, setScrollerColor] = useState(pageColor);
    const [currentColor, setCurrentColor] = useState("#D9D9D9");

    const enterScroll = () => {
        setScrollerColor(darken(0.1, pageColor));
    };
    
    const leaveScroll = () => {
        setScrollerColor(pageColor)
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
    const handleHover = (title, color) => {
        setCurrentProject(title);
        setCurrentColor(color);
    };

    const displayNone = () => {
        setCurrentProject("");
        setCurrentColor('#D9D9D9');
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
                <div className='portfolio-preview' style={{backgroundColor: currentColor}}>
                    <div className = 'portfolio-preview-title'>{currentProject}</div>
                    <img alt='An alt title' src={`${process.env.PUBLIC_URL}/assets/test.png`}></img>
                    <div className = 'portfolio-preview-description'>
                        <div>AI Research</div>
                        <div>Full Stack Development</div>
                        <div>Prototyping</div>
                    </div>
                </div>
            </div>

            <div className='body-right projects firefox-scroll' ref={scrollRef}>
                <div className='project-header-parent' style={{backgroundColor: elementColor}}><h3 className='project-header'>Professional Work</h3><div className='project-count'>7</div></div>
                <ul className='project-list' style={{marginBottom: "40px"}}>
                    <Link to="/projects/sonic" onMouseEnter={(e) => handleHover("SONIC MUTATIONS", '#FFF0A2')} onMouseLeave={displayNone}><li>Sonic Mutations</li></Link>
                    <Link to="/projects/system" onMouseEnter={(e) => handleHover("SYSTEM OF A SOUND", '#C2C2F2')} onMouseLeave={displayNone}><li>System of a Sound</li></Link>
                    <Link to="/projects/sonic"><li>PANIC!</li></Link>
                    <Link to="/projects/sonic"><li>Cybernetic Star Coasters</li></Link>
                    <Link to="/projects/sonic"><li>Futures Spinner</li></Link>
                    <Link to="/projects/sonic"><li>Australian Cybernetic Interactive Poster</li></Link>
                    <Link to="/projects/sonic"><li>Woroni Magazine Designs</li></Link>
                </ul>
                <div className='project-header-parent' style={{backgroundColor: elementColor}}><h3 className='project-header'>Personal Work</h3><div className='project-count'>10</div></div>
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

