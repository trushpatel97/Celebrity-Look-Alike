import React, {Component} from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ParticlesJS from './components/Particles/Particles';
import 'tachyons';
var url = require('url');





function App() {
  return (
    <div className="App">
    <Navigation/>
    <ParticlesJS/>
      
      {/*<Logo/>
      <ImageLinkForm/>
      <CelebrityRecognition/>*/}
    </div>
  );
}

export default App;
