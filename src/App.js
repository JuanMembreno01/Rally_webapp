import React from 'react';
import BlocklyComponent from './BlocklyComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        ¡Diviértete con TechVoyager!
      </header>
      <main>
        <div className="blockly-container">
          <BlocklyComponent />
        </div>
        <button>Generar Código</button>
      </main>
    </div>
  );
}

export default App;
