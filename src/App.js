import React, {Component} from 'react'
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ParticlesJS from './components/Particles/Particles';
import Logo from './components/Logo/Logo';
import 'tachyons';
var url = require('url');


{/*
  Feeding API key to use the clarifai pretrained models
*/}
const app = new Clarifai.App({
  apiKey: "4a029d6b296d4889b93d1c2bf9519031",
 });


class App extends Component {
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl: '',
    }
  }
  render(){
    return (
      <div className="App">
        <Navigation/>
        <ParticlesJS/>
        <Logo/>
          {/*<Logo/>
          <ImageLinkForm/>
          <CelebrityRecognition/>*/}
      </div>
    ); 
  }
}

export default App;
