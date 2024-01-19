import React, {useState, useEffect} from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Projects(){   
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);

    return (
        <div className={`${transitionStage} body`}
        onAnimationEnd={() => {
          if (transitionStage === "fadeOut") {
            setTransistionStage("fadeIn");
            setDisplayLocation(location);
          }
        }}>
            <div className='body-left lower-align'>
                <img src='./assets/temp.png' alt='temp' className='portfolio-image'></img>
            </div>

            <div className='body-right'>
                <ul className='project-list'>
                    <Link to="/projects/sonic"><li>Sonic Mutations</li></Link>
                    <li>System of a Sound</li>
                    <li>PANIC</li>
                    <li>Quantum Phonons</li>
                </ul>
            </div>
        </div>
    )
}

