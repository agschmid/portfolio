import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion"


export default function Sonic(){   
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
                <li>Test</li>

                <motion.div
                    animate={{ y: -250 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1,
                        repeatDelay: 1,
                    }}>            
                    <li>Sonic Mutations</li>
                </motion.div>
                </ul>
            </div>
        </div>
    )
}

