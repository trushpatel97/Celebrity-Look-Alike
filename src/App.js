import React, {Component} from 'react'
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import ParticlesJS from './components/Particles/Particles.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import CelebrityRecognition from './components/CelebrityRecognition/CelebrityRecognition.js';
import 'tachyons';


const app = new Clarifai.App({
  apiKey: "4a029d6b296d4889b93d1c2bf9519031",
 });

const titleCase = (str) =>{
  var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' ');
}
class App extends Component {
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl: '',
      celebName: {}
    }
  }

  displayData = data =>{
    for(let i=0;i<10;i++){
      const name = data.outputs[0].data.regions[0].data.concepts[i].name;
      let probability = data.outputs[0].data.regions[0].data.concepts[i].value;
      probability*=100;
      console.log(name.toUpperCase() + " " + probability.toFixed(5) + "%");
    }
    let p1 = data.outputs[0].data.regions[0].data.concepts[0].name;
    p1=titleCase(p1);
    let p2 = data.outputs[0].data.regions[0].data.concepts[0].value;
    const name = `Guessed ${p1}`;
    const prob = ` with a ${p2.toFixed(5)*100}% resemblance`
    const results = name+prob;
    return {results};
  }
  displayCelebName = celebName =>{
    this.setState({
      celebName
    })
  }
  onInputChange = (event) =>{
    this.setState({input: event.target.value});
    console.log(event.target.value);
  }
  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.CELEBRITY_MODEL,this.state.input)
    .then(response=>this.displayCelebName(this.displayData(response)))
    .catch(err=>console.log(err));
  }

  render(){
    return (
      <div className="App">
        <Navigation/>
        <Logo/>
        <ImageLinkForm
          celebName={this.state.celebName}
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <CelebrityRecognition imageUrl={this.state.imageUrl}/>
          {/*<Logo/>
          <ImageLinkForm/>
          <CelebrityRecognition/>*/}
          <ParticlesJS/>
      </div>
    ); 
  }
}

export default App;
