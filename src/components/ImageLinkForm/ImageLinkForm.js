import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange,onButtonSubmit,celebName}) => {
    return (
        <div>
            <p className='f3'>
                {'Paste URL to detect face'}
            </p>
            <p>
                {celebName.results}
            </p>
            <div className='center'>
                <div className="form center pa4 br3 shadow-4">
                    <input className="f4 pa2 w-70 center" type="tex" onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib black transparent"
                    onClick = {onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}   
export default ImageLinkForm;