import React from 'react';
import BlocklyComponent from './BlocklyComponent';
import ParticlesComponent from './particles';
import './App.css';

function App() {
  return (
    <div className="App">
      <ParticlesComponent id="particles"/>
      <header>
        ¡Diviértete con TechVoyager!
      </header>
      <main>
        <div className="blockly-container">
          <BlocklyComponent />
        </div>
        <div className="button-container">
          <button className="secondary">Comprobar Conexión</button>
        </div>
      </main>
    </div>
  );
}

export default App;
