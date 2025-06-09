import React from 'react';
import './CelebrityRecognition.css';

const FaceRecognition = ({imageUrl}) => {
    return (
        <div className='center'>
            <img id='inputimage' alt="Celebrity" src={imageUrl}></img>
        </div>
    );
}   
export default FaceRecognition;