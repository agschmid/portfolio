import './css/ProjectDisplay.css';
import React, {useState, useEffect, useRef} from 'react';
import { Link, useLocation } from "react-router-dom";
import Pointer from './assets/Pointer.js'; 
import { darken } from 'polished';
import projectData from './professionalProject.json'; 
import mobileCheck from './mobileCheck.js';

export default function Projects(props){   
    const pageColor = "#D5D3C5"
    const textColor = '#000000'
    const setBackgroundColor = props.setBackgroundColor;
    const setTextColor = props.setTextColor;
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
    const isMobile = mobileCheck();
    const [elementColor, setElementColor] = useState("rgba(255,0,0,0)");
    const [marginBottom, setMarginBottom] = useState(0);


    // Animate the page if it changes
    useEffect(() => {
        if (location.pathname !== displayLocation.pathname){
            setTransistionStage("fadeOut");
        } 
    }, [location, displayLocation]);

    // Set the page color and background colors on page load
    useEffect(() => {
        setBackgroundColor(pageColor);
        setTextColor(textColor);
        const timer = setTimeout(() => {
            setElementColor(pageColor);
        }, 300);
        return () => clearTimeout(timer);
    }, [setBackgroundColor, setTextColor]);

    // Set the displayed project to the first one
    useEffect(() => {
        updateProjectDisplay(0, projectData[0].displayTitle, projectData[0].color, projectData[0].imageUrl);
    }, []); 

    // Use the wheel event to scroll down the projects list
    useEffect(() => {
        const handleWheel = (event) => {
            const container = scrollRef.current;
            const delta = event.deltaY || event.detail || event.wheelDelta;
            const newScrollTop = container.scrollTop + delta;
            const maxScrollHeight = container.scrollHeight - container.clientHeight;
            const limitedScrollTop = Math.max(0, Math.min(maxScrollHeight, newScrollTop));
            limitedScrollTop === maxScrollHeight ? setScrollerShowing(false) : setScrollerShowing(true);
            container.scrollTop = limitedScrollTop;
            setTopmostVisibleElement();
        };
      
        document.addEventListener('wheel', handleWheel, { passive: false });
        document.querySelector('.body-right').addEventListener('scroll', setTopmostVisibleElement);
        return () => {
            document.removeEventListener('wheel', handleWheel);
        };
    });

    // Set the current project to the hovered link's index
    useEffect(() => {
        const projectRef = document.querySelector('.projects');
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
    
    // Functions to darken the scroller on hover
    const enterScroll = () => {
        setScrollerColor(darken(0.1, pageColor));
    };
    const leaveScroll = () => {
        setScrollerColor(pageColor)
    };

    // Scroll up/down the page when the scroller button is pressed
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
    
    // Function to handle which project is displayed on the side
    const updateProjectDisplay = (index, title, color, image) => {
        setCurrentProject(title);
        setCurrentColor(color);
        setCurrentProjectIndex(index);
        setCurrentImage(image);
    };

    // On mobile, set the current project to the top scrolled one
    const setTopmostVisibleElement = () => {
        if (isMobile){
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
                        }
                    }
                }
                if (topmostVisibleElement===null) {topmostVisibleElement=projectAnchorList.length-1};
                setCurrentProjectIndex(topmostVisibleElement);
                updateProjectDisplay(topmostVisibleElement, projectData[topmostVisibleElement].displayTitle, projectData[topmostVisibleElement].color, projectData[topmostVisibleElement].imageUrl);
            }
        }
    }

    // Set the margin of the bottom project on mobile so it scrolls to the top
    useEffect(() => {
        const updateMarginBottom = () => {
            if (isMobile){
                const projectsContainer = document.querySelector('.projects');
                const projectHeader = document.querySelector('.project-header-parent');
                const projectLast = document.querySelector('.lastProject');
                if (projectsContainer && projectHeader && projectLast) {
                    const containerStyle = window.getComputedStyle(projectsContainer);
                    const paddingTop = parseFloat(containerStyle.paddingTop);
                    const paddingBottom = parseFloat(containerStyle.paddingBottom);
                    const projectsHeight = projectsContainer.clientHeight - paddingTop - paddingBottom;
                    const projectHeaderHeight = projectHeader.clientHeight;
                    const projectLastHeight = projectLast.clientHeight;
                    const newMarginBottom = projectsHeight - projectHeaderHeight - 2*projectLastHeight;
                    setMarginBottom(newMarginBottom);
                }
            }
        };
            updateMarginBottom();
            const handleResize = () => {
                updateMarginBottom();
            };
    
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);


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
                            <div key={i} className='colored'>{role}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="body-right projects firefox-scroll" ref={scrollRef}>
                <div className='project-header-parent' style={{backgroundColor: elementColor}}><h3 className='project-header'>professional work</h3><div className='project-count'>7</div></div>
                <ul className='project-list' style={{marginBottom: "40px"}}>
                    {projectData.slice(0, 7).map((link, index) => (
                        <Link key={index} to={"/projects"+link.relLink} onMouseEnter={(e) => updateProjectDisplay(index, link.displayTitle, link.color, link.imageUrl)}><li>{link.linkTitle}</li></Link>
                    ))}
                </ul>
                <div className='project-header-parent' style={{backgroundColor: elementColor}}><h3 className='project-header'>personal work</h3><div className='project-count'>10</div></div>
                <ul className='project-list' style={{marginBottom: "40px"}}>
                    {projectData.slice(7).map((link, index, array) => (
                        <Link
                            key={index + 7}
                            to={"/projects" + link.relLink}
                            onMouseEnter={(e) => updateProjectDisplay(index + 7, link.displayTitle, link.color, link.imageUrl)}
                            style={index === array.length - 1 ? {marginBottom: `${marginBottom}px` } : {}}
                            className={index === array.length - 1 ? "lastProject" : ""}
                        >
                            <li>{link.linkTitle}</li>
                        </Link>
                    ))}
                </ul>
                <div onClick={scrollMore} onMouseEnter={enterScroll} onMouseLeave={leaveScroll} className='pointerParent'>
                    <Pointer  color={scrollerColor} rotation = {scrollerShowing ? 'showPointer' : 'hidePointer'}></Pointer>
                </div>
                
            </div>
        </div>

    )
}

