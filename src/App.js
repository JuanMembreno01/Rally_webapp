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
        <div className="button-container">
          {/* Sólo el botón secundario queda aquí */}
          <button className="secondary">Comprobar Conexión</button>
        </div>
      </main>
    </div>
  );
}

export default App;
