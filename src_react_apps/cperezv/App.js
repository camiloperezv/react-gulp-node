import './App.css';
import React, { Component } from 'react';
import MyName from './components/my-name/my-name'
class App  extends Component{

  render() {
    return (
      <div className="say_hello"> HELLO MRdddd: <MyName /> </div>
    );
  }
}

export default App;
