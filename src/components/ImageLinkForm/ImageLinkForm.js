import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange,onButtonSubmit,celebName,imageUrl}) => {
    return (
        <div>
            <p className='f3 form center pa br3 shadow-4 opacitychange'>
                {'Paste URL to detect face'}
            </p>
            <div className='center'>
                <div className="form center pa4 br3 shadow-4 opacitychange">
                    <input className="f4 pa2 w-70 center" type="tex" onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib black transparent"
                    onClick = {onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
            <p className="form center pa2 br3 shadow-4 opacitychange">
                    {celebName.results}
            </p>
            <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        </div>
    );
}   
export default ImageLinkForm;