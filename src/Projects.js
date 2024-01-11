import React from 'react';

class Projects extends React.Component {
    
    render() {
        return (
            <div className='body'>
                <div className='body-left lower-align'>
                    <img src='./assets/temp.png' alt='temp' className='portfolio-image'></img>
                </div>

                <div className='body-right'>
                    <ul className='project-list'>
                        <li>Sonic Mutations</li>
                        <li>System of a Sound</li>
                        <li>PANIC</li>
                        <li>Quantum Phonons</li>
                    </ul>
                </div>
            </div>
        )
    }
}



export default Projects;