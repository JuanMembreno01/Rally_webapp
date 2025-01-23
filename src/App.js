import React from 'react';
import BlocklyComponent from './BlocklyComponent';
import ParticlesComponent from './particles';
import './App.css';

function App() {
  return (
    <div className="App">
      <ParticlesComponent id="particles"/>
      <header>
        ¡Diviértete con TecnoBot!
      </header>
      <main>
        <div className="blockly-container">
          <BlocklyComponent />
        </div>
        <div className="button-container">
        
        </div>
      </main>
    </div>
  );
}

export default App;
