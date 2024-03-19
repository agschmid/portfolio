import React, {useState, useEffect, useRef} from 'react';
// import { Link, useLocation } from "react-router-dom";
import {useLocation } from "react-router-dom";
import Pointer from './assets/Pointer.js'; // Import the SVG file
import { darken } from 'polished';

export default function System(props){   
    const pageColor = "#C2C2F2"
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
    const [scrollerShowing, setScrollerShowing] = useState('true');
    const [scrollerColor, setScrollerColor] = useState(pageColor);

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
                    <div className = 'portfolio-preview-title'>System of a Sound</div>
                    <div className = 'portfolio-preview-description'>description</div>
            </div>

            <div className='body-right projects firefox-scroll' ref={scrollRef}>
                <div className='project-header-parent' style={{backgroundColor: elementColor}}><h3 className='project-header'>Process</h3></div>
                <ul className='project-list' style={{marginBottom: "40px"}}>
                    <li>Lots of text goes here!</li>
                </ul>
                <div className='project-header-parent' style={{backgroundColor: elementColor}}><h3 className='project-header'>Something Else</h3></div>
                <ul className='project-list'>
                    <li>Lots of text goes here!</li>
                </ul>

                <div onClick={scrollMore} onMouseEnter={enterScroll} onMouseLeave={leaveScroll} className='pointerParent'>
                    <Pointer  color={scrollerColor} rotation = {scrollerShowing ? 'showPointer' : 'hidePointer'}></Pointer>
                </div>
                
            </div>
        </div>

    )
}

