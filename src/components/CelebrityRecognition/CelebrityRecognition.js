import React from 'react';

const FaceRecognition = ({imageUrl}) => {
    return (
        <div className='center'>
            <img alt="" src={imageUrl} height="300px" width="auto"></img>
        </div>
    );
}   
export default FaceRecognition;