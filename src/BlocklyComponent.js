import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import * as BlocklyMsg from 'blockly/msg/es';
Blockly.setLocale(BlocklyMsg);

// Definición de imágenes SVG con contorno blanco
const arrowForward = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"%3E%3Cpath d="M12 2 L12 22 M12 22 L5 15 M12 22 L19 15" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" /%3E%3C/svg%3E';
const arrowBackward = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"%3E%3Cpath d="M12 22 L12 2 M12 2 L5 9 M12 2 L19 9" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" /%3E%3C/svg%3E';
const arrowRight = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"%3E%3Cpath d="M2 12 L22 12 M22 12 L15 5 M22 12 L15 19" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" /%3E%3C/svg%3E';
const arrowLeft = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"%3E%3Cpath d="M22 12 L2 12 M2 12 L9 5 M2 12 L9 19" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" /%3E%3C/svg%3E';
const stop = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"%3E%3Crect x="4" y="4" width="16" height="16" stroke="%23ffffff" stroke-width="2" /%3E%3C/svg%3E';

// Mapeo de tipos de bloque a comandos
const blockTypeToCommandType = {
  girar_derecha: "turn_right",
  girar_izquierda: "turn_left",
  mover_adelante: "move_forward",
  mover_atras: "move_backward",
  motor_stop: "stop",
};

const BlocklyComponent = () => {
  const blocklyDiv = useRef(null);
  const workspace = useRef(null);

  useEffect(() => {
    if (!workspace.current) {
      // Bloque girar_derecha (Magenta)
      Blockly.Blocks['girar_derecha'] = {
        init: function () {
          this.jsonInit({
            "message0": "%1",
            "args0": [
              {
                "type": "field_image",
                "src": arrowRight,
                "width": 30,
                "height": 30,
                "alt": "Girar Derecha"
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#ff00ff", 
            "tooltip": "Gira el carrito a la derecha.",
            "helpUrl": ""
          });
        }
      };

      // Bloque girar_izquierda (Rojo)
      Blockly.Blocks['girar_izquierda'] = {
        init: function () {
          this.jsonInit({
            "message0": "%1",
            "args0": [
              {
                "type": "field_image",
                "src": arrowLeft,
                "width": 30,
                "height": 30,
                "alt": "Girar Izquierda"
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#ff0000",
            "tooltip": "Gira el carrito a la izquierda.",
            "helpUrl": ""
          });
        }
      };

      // Bloque mover_adelante (Cian)
      Blockly.Blocks['mover_adelante'] = {
        init: function () {
          this.jsonInit({
            "message0": "%1",
            "args0": [
              {
                "type": "field_image",
                "src": arrowForward,
                "width": 30,
                "height": 30,
                "alt": "Mover Adelante"
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#00ffff", 
            "tooltip": "Mueve el carrito hacia adelante.",
            "helpUrl": ""
          });
        }
      };

      // Bloque mover_atras (Verde Lima)
      Blockly.Blocks['mover_atras'] = {
        init: function () {
          this.jsonInit({
            "message0": "%1",
            "args0": [
              {
                "type": "field_image",
                "src": arrowBackward,
                "width": 30,
                "height": 30,
                "alt": "Mover Atrás"
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#00ff00", 
            "tooltip": "Mueve el carrito hacia atrás.",
            "helpUrl": ""
          });
        }
      };

      // Bloque motor_stop (Amarillo)
      Blockly.Blocks['motor_stop'] = {
        init: function () {
          this.jsonInit({
            "message0": "%1",
            "args0": [
              {
                "type": "field_image",
                "src": stop,
                "width": 30,
                "height": 30,
                "alt": "Detener Motor"
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#ffa500",
            "tooltip": "Detiene el motor seleccionado.",
            "helpUrl": ""
          });
        }
      };

      // Bloque repetir (Verde Neón)
    /* Blockly.Blocks['controls_repeat_ext'] = {
        init: function () {
          this.jsonInit({
            "message0": "Repetir %1 veces",
            "args0": [
              {
                "type": "input_value",
                "name": "TIMES",
                "check": "Number"
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#39ff14",
            "tooltip": "Repite una serie de instrucciones varias veces.",
            "helpUrl": ""
          });
        }
      };*/

      // Inyectar Blockly  <block type="controls_repeat_ext">   <block type="math_number"></block>
      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: `<xml>
                    <block type="mover_adelante"></block>
                    <block type="mover_atras"></block>
                    <block type="girar_derecha"></block>
                    <block type="girar_izquierda"></block>
                    <block type="motor_stop"></block>
                    
                 
                      <value name="TIMES">
                        <block type="math_number">
                          <field name="NUM">1</field>
                        </block>
                      </value>
                    </block>
                  </xml>`,
        disableContextMenu: false,
      });

      // Registrar la opción en el menú contextual para limpiar todo
      Blockly.ContextMenuRegistry.registry.register({
        id: 'clear_workspace',
        scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
        precondition: function(scope) {
          const ws = scope.workspace;
          return ws.getAllBlocks(false).length > 0 ? 'enabled' : 'disabled';
        },
        weight: 210,
        displayText: function() {
          return 'Limpiar todo';
        },
        callback: function(scope) {
          const ws = scope.workspace;
          ws.clear();
        }
      });
    }
  }, []);

  const getAllBlocksJSON = () => {
    if (workspace.current) {
      const topBlocks = workspace.current.getTopBlocks(true);
      const commands = [];
      const sortedBlocks = topBlocks.sort((a, b) => a.getRelativeToSurfaceXY().y - b.getRelativeToSurfaceXY().y);

      sortedBlocks.forEach(topBlock => {
        let currentBlock = topBlock;
        while (currentBlock) {
          const commandType = blockTypeToCommandType[currentBlock.type];
          if (commandType) {
            commands.push({ type: commandType });
          } else {
            console.warn(`Tipo de bloque desconocido: ${currentBlock.type}`);
          }
          currentBlock = currentBlock.getNextBlock();
        }
      });

      return {
        commands: [
          {
            commands: commands
          }
        ]
      };
    } else {
      console.warn("workspace.current es undefined");
      return null;
    }
  };

  const generateCode = () => {
    console.log("Botón Generar Código presionado");
    const json = getAllBlocksJSON();
    if (json) {
      console.log("JSON a enviar:", JSON.stringify(json, null, 2));
      fetch('https://sensorback.onrender.com/send-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      })
        .then(response => {
          console.log("Status response:", response.status);
          return response.json();
        })
        .then(data => {
          console.log("Respuesta del servidor:", data);
        })
        .catch(error => {
          console.error("Error al enviar los comandos:", error);
        });
    } else {
      console.log("No se generó código. Verifica que hayas colocado bloques en el workspace.");
    }
  };

  return (
    <div>
      <div
        ref={blocklyDiv}
        style={{
          height: '480px',
          width: '100%',
          maxWidth: '800px',
          border: '1px solid #ccc',
          marginBottom: '20px',
          boxShadow: '0 0 10px #39ff14, 0 0 20px #00ffff',
          borderRadius: '10px',
          background: 'transparent',
        }}>
      </div>
      <button onClick={generateCode}>
        Generar Código
      </button>
    </div>
  );
};

export default BlocklyComponent;
