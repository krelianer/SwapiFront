import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/navigation/navigation-bar';
import PlanetsContainer from './components/planets/planets-container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar></NavigationBar>
        <header className="App-header">
        </header>
        <div className="App-body">
        <PlanetsContainer></PlanetsContainer>
        </div>
      </div>
    );
  }
}

export default App;
