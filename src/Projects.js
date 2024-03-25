import React, {useState, useEffect, useRef} from 'react';
import { Link, useLocation } from "react-router-dom";
import Pointer from './assets/Pointer.js'; 
import { darken } from 'polished';
import projectData from './professionalProject.json'; 

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
    const [currentColor, setCurrentColor] = useState("");
    const [currentImage, setCurrentImage] = useState("");
    const [currentProjectIndex, setCurrentProjectIndex] = useState('0')

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
            setTopmostVisibleElement();
        };
      
        // Add event listener to the container for the 'wheel' event
        document.addEventListener('wheel', handleWheel, { passive: false });
        document.querySelector('.body-right').addEventListener('scroll', setTopmostVisibleElement);
    
        // Clean up the event listener when the component unmounts
        return () => {
        document.removeEventListener('wheel', handleWheel);
        };
    }); // Empty dependency array ensures this effect runs only once
      


    const setTopmostVisibleElement = () => {
        const projectRef = document.querySelector('.projects');

        if (projectRef) {
            const projectAnchorList = projectRef.querySelectorAll('a');
            const containerRect = projectRef.getBoundingClientRect();
            const containerTop = containerRect.top;
        
            let topmostVisibleElement = null;
            let minOffsetTop = Infinity;

            for (let i = 0; i < projectAnchorList.length; i++) {
                const element = projectAnchorList[i];
                const boundingRect = element.getBoundingClientRect();
        
                // Check if the element is within the viewport vertically within the container
                if (boundingRect.top >= containerTop+5) {
                    // Find the element with the smallest offset from the top
                    if (boundingRect.top < minOffsetTop) {
                        minOffsetTop = boundingRect.top;
                        topmostVisibleElement = i;
                        console.log(i);
                    }
                }
            }

            setCurrentProjectIndex(topmostVisibleElement);
            updateProjectDisplay(topmostVisibleElement, projectData[topmostVisibleElement].displayTitle, projectData[topmostVisibleElement].color, projectData[topmostVisibleElement].imageUrl);
        }
    }

    // Function to handle hover state change
    const updateProjectDisplay = (index, title, color, image) => {
        setCurrentProject(title);
        setCurrentColor(color);
        setCurrentProjectIndex(index);
        setCurrentImage(image);
    };

    useEffect(() => {
        const projectRef = document.querySelector('.project-list');
        if (projectRef) {
            const projectAnchorList = projectRef.querySelectorAll('a');
            for (let i = 0; i < projectAnchorList.length; i++) {
                if (i === currentProjectIndex) {
                    projectAnchorList[i].classList.add('hovered-project');
                } else {
                    projectAnchorList[i].classList.remove('hovered-project');
                }
            }
        }
    }, [currentProjectIndex]);


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

    useEffect(() => {
        updateProjectDisplay(0, projectData[0].displayTitle, projectData[0].color, projectData[0].imageUrl);
    }, []); 


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
                    <img className = 'preview-image' alt='An alt title' src={`${process.env.PUBLIC_URL}/assets/${currentImage}`}></img>
                    <div className = 'portfolio-preview-description'>
                        {projectData[currentProjectIndex].roles.map((role, i) => (
                            <div key={i}>{role}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="body-right projects firefox-scroll" ref={scrollRef}>
                <div className='project-header-parent' style={{backgroundColor: elementColor}}><h3 className='project-header'>Professional Work</h3><div className='project-count'>7</div></div>
                <ul className='project-list' style={{marginBottom: "40px"}}>
                    {projectData.slice(0, 7).map((link, index) => (
                        <Link key={index} to={"/projects"+link.relLink} onMouseEnter={(e) => updateProjectDisplay(index, link.displayTitle, link.color, link.imageUrl)}><li>{link.linkTitle}</li></Link>
                    ))}
                </ul>
                <div className='project-header-parent' style={{backgroundColor: elementColor}}><h3 className='project-header'>Personal Work</h3><div className='project-count'>10</div></div>
                <ul className='project-list' style={{marginBottom: "40px"}}>
                    {projectData.slice(7).map((link, index) => (
                        <Link key={index} to={"/projects"+link.relLink} onMouseEnter={(e) => updateProjectDisplay(index, link.displayTitle, link.color, link.imageUrl)}><li>{link.linkTitle}</li></Link>
                    ))}
                </ul>
                {/* <ul className='project-list'>
                    <Link to="/projects/sonic"><li>Machine Learning Bechdel Test</li></Link>
                    <Link to="/projects/sonic"><li>Laser Cut Iris</li></Link>
                    <Link to="/projects/sonic"><li>Quantum Phonon Research</li></Link>
                    <Link to="/projects/sonic"><li>Ping 3D Web Game</li></Link>
                    <Link to="/projects/sonic"><li>Autonomous Scooter Interface</li></Link>
                    <Link to="/projects/sonic"><li>Baking</li></Link>
                    <Link to="/projects/sonic"><li>Backwash Homepage</li></Link>
                    <Link to="/projects/sonic"><li>Arduino Doodle Jump</li></Link>
                    <Link to="/projects/sonic"><li>Smart Loading Zones</li></Link>
                    <Link to="/projects/sonic" className='lastProject'><li>Habit Helper</li></Link>
                </ul> */}

                <div onClick={scrollMore} onMouseEnter={enterScroll} onMouseLeave={leaveScroll} className='pointerParent'>
                    <Pointer  color={scrollerColor} rotation = {scrollerShowing ? 'showPointer' : 'hidePointer'}></Pointer>
                </div>
                
            </div>
        </div>

    )
}

