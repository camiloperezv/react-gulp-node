import './App.css';
import React, { Component } from 'react';
import PetName from './components/pet-name/pet-name'
class App  extends Component{

  render() {
    return (
      <div className="say_hello"> Pleas make a sound: <PetName /> </div>
    );
  }
}

export default App;
