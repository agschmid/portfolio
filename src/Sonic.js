import './css/Project.css';
import React, {useState, useEffect, useRef} from 'react';
import { Link, useLocation } from "react-router-dom";
import Pointer from './assets/Light_Pointer.js'; 
import { darken } from 'polished';


export default function Sonic(props){   
    const pageColor = "#C73D1D"
    const textColor = "#D5D3C5"
    const setBackgroundColor = props.setBackgroundColor;
    const setTextColor = props.setTextColor;
    const scrollRef = useRef(null);
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");
    const [scrollerShowing, setScrollerShowing] = useState('true');
    const [scrollerColor, setScrollerColor] = useState(pageColor);
    const [elementColor, setElementColor] = useState("rgba(255,0,0,0)");


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
        };
      
        document.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            document.removeEventListener('wheel', handleWheel);
        };
    });

    
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
    

    return (
        <div className={`${transitionStage} body project`}
        onAnimationEnd={() => {
          if (transitionStage === "fadeOut") {
            setTransistionStage("fadeIn");
            setDisplayLocation(location);
          }
        }}>
            <div className='body-left'>
                <div className = 'project-info-title'>sonic mutations</div>
                <img className = 'mobile project-image' alt='An alt title' src={`${process.env.PUBLIC_URL}/assets/ipad.png`}></img>
                <div className='project-info-split'>
                    <div className='project-info'>
                        <div className = 'project-oner'>
                            A live music collaboration between musicians and artificial intelligence, performed at the Sydney Opera House.                    
                        </div>
                        <div>
                            <h3 className='project-header'>Roles</h3>
                            <div className = 'portfolio-list-star'>
                                <div>AI Research</div>
                                <div>Full Stack Development</div>
                                <div>Design Prototyping</div>
                            </div>
                        </div>
                        <div>
                            <h3 className='project-header'>Tools</h3>
                            <div className = 'portfolio-list-star'>
                                <div>PyTorch</div>
                                <div>HTML/CSS/JS</div>
                                <div>Stable Diffusion</div>
                                <div>Flask</div>
                                <div>Docker</div>
                                <div>Cog</div>
                            </div>
                        </div>
                    </div>

                    <ul className='project-buttons buttonParent desktop'>
                        <li className='left nothighlighted'><Link className="button" to="/projects">← BACK</Link></li>
                        <li className='right nothighlighted'><Link className="button" to="/projects/system">NEXT →</Link></li>
                    </ul>
                </div>
            </div>

            <div style={{backgroundColor: elementColor}} className="body-right projects firefox-scroll" ref={scrollRef}>
                <img className = 'project-image desktop' alt='An alt title' src={`${process.env.PUBLIC_URL}/assets/ipad.png`}></img>
                <h3 className='project-header'>Summary</h3>
                <p className='project-body' style={{marginBottom: "40px"}}>
                    First commissioned by the Sydney Opera House and piloted for Outlines Festival in July 2023, Sonic Mutations is a generative music exploration developed with artists.  We've developed a tool that can help artists practice, perform and unlock new creative ideas based on their own IP. The beauty of the tool is its ability to take live inputs and create new outputs. This means the tool can work with them as a sample generator, composing partner or even as a live performance collaborator.                </p>
                <div onClick={scrollMore} onMouseEnter={enterScroll} onMouseLeave={leaveScroll} className='pointerParent'>
                    <Pointer  color={scrollerColor} rotation = {scrollerShowing ? 'showPointer' : 'hidePointer'}></Pointer>
                </div>
                
            </div>

            <ul className='project-buttons buttonParent mobile'>
                        <li className='left nothighlighted'><Link className="button" to="/projects">← BACK</Link></li>
                        <li className='right nothighlighted'><Link className="button" to="/projects/system">NEXT →</Link></li>
            </ul>
        </div>

    )
}

