import React, {Component} from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import ParticlesJS from './components/Particles/Particles.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import CelebrityRecognition from './components/CelebrityRecognition/CelebrityRecognition.js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register'
import Rank from './components/Rank/Rank';
import 'tachyons';




const titleCase = (str) =>{
  var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' ');
}
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  celebName: {},
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state={
      ...initialState,
      error: '' // Add error to state
    };
  }
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  
  displayData = data => {
    // Accept concepts at root or nested
    let concepts = null;
    if (Array.isArray(data.concepts) && data.concepts.length > 0) {
      concepts = data.concepts;
    } else if (
      data.outputs &&
      data.outputs[0] &&
      data.outputs[0].data &&
      Array.isArray(data.outputs[0].data.concepts) &&
      data.outputs[0].data.concepts.length > 0
    ) {
      concepts = data.outputs[0].data.concepts;
    } else if (
      data.outputs &&
      data.outputs[0] &&
      data.outputs[0].data &&
      data.outputs[0].data.regions &&
      data.outputs[0].data.regions[0] &&
      data.outputs[0].data.regions[0].data &&
      Array.isArray(data.outputs[0].data.regions[0].data.concepts) &&
      data.outputs[0].data.regions[0].data.concepts.length > 0
    ) {
      concepts = data.outputs[0].data.regions[0].data.concepts;
    }
    if (concepts && concepts.length > 0) {
      const results = concepts.slice(0, 10).map(c => {
        const name = titleCase(c.name);
        const confidence = (c.value * 100).toFixed(2) + '%';
        return `${name} (${confidence})`;
      }).join(', ');
      return { results };
    }
    return { results: 'Unable to process image. Please try a different image URL.' };
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
    this.setState({imageUrl: this.state.input, error: ''});
        fetch('https://celebrity-backend-cuzl.onrender.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log('hi', response)
          // Check for concepts in all possible locations
          let concepts = null;
          if (
            response.outputs &&
            response.outputs[0] &&
            response.outputs[0].data &&
            (
              (Array.isArray(response.outputs[0].data.concepts) && response.outputs[0].data.concepts.length > 0) ||
              (Array.isArray(response.outputs[0].data.regions) && response.outputs[0].data.regions.length > 0 && response.outputs[0].data.regions[0].data && Array.isArray(response.outputs[0].data.regions[0].data.concepts) && response.outputs[0].data.regions[0].data.concepts.length > 0)
            )
          ) {
            concepts = response.outputs[0].data.concepts;
          } else if (Array.isArray(response.concepts) && response.concepts.length > 0) {
            // Handle backend's new response format
            concepts = response.concepts;
          }
          if (!concepts) {
            this.setState({ error: 'Unable to process image. Please try a different image URL.' });
            return;
          }
          fetch('https://celebrity-backend-cuzl.onrender.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                // Fix: update user state correctly
                this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    entries: count.entries || count // handle both {entries: x} and x
                  }
                }));
              })
              .catch(console.log)
  
          // Pass concepts to display logic
          this.displayCelebName(this.displayData({ concepts }))
        })
        .catch(err => {
          this.setState({ error: 'Network error. Please try again.' });
          console.log(err);
        });
  }
  onRouteChange = (route)=>{
    if(route === 'signout'){
      this.setState(initialState)//so other users dont see where users left off
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render(){
    const { isSignedIn, imageUrl, route, celebName, error } = this.state;
    return (
      <div className="App">
      <ParticlesJS/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { error && (
          <div style={{ color: 'red', margin: '10px' }}>{error}</div>
        )}
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                celebName = {celebName}
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <CelebrityRecognition imageUrl={imageUrl}/>
              
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}
export default App;
