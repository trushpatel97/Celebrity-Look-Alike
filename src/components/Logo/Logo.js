import React from 'react';
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import person from './qmark.png';
const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 30 }}  >
                <div className="Tilt-inner pa3"> 
                    <img src={person} alt="logo"/> 
                </div>
            </Tilt>
        </div>
    );
}   
export default Logo;