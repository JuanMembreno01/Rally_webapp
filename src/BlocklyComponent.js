import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import * as BlocklyMsg from 'blockly/msg/es';
Blockly.setLocale(BlocklyMsg);

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

  const arrowForward = 'data:image/svg+xml,%3Csvg%20...%3E';
  const arrowBackward = 'data:image/svg+xml,%3Csvg%20...%3E';
  const arrowRight = 'data:image/svg+xml,%3Csvg%20...%3E';
  const arrowLeft = 'data:image/svg+xml,%3Csvg%20...%3E';
  const stop = 'data:image/svg+xml,%3Csvg%20...%3E';

  useEffect(() => {
    if (!workspace.current) {
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
            "colour": 230,
            "tooltip": "Gira el carrito a la derecha.",
            "helpUrl": ""
          });
        }
      };

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
            "colour": 230,
            "tooltip": "Gira el carrito a la izquierda.",
            "helpUrl": ""
          });
        }
      };

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
            "colour": 160,
            "tooltip": "Mueve el carrito hacia adelante.",
            "helpUrl": ""
          });
        }
      };

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
            "colour": 160,
            "tooltip": "Mueve el carrito hacia atrás.",
            "helpUrl": ""
          });
        }
      };

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
            "colour": 0,
            "tooltip": "Detiene el motor seleccionado.",
            "helpUrl": ""
          });
        }
      };

      Blockly.Blocks['controls_repeat_ext'] = {
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
            "colour": 120,
            "tooltip": "Repite una serie de instrucciones varias veces.",
            "helpUrl": ""
          });
        }
      };

      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: `<xml>
                    <block type="mover_adelante"></block>
                    <block type="mover_atras"></block>
                    <block type="girar_derecha"></block>
                    <block type="girar_izquierda"></block>
                    <block type="motor_stop"></block>
                    <block type="math_number"></block>
                    <block type="controls_repeat_ext">
                      <value name="TIMES">
                        <block type="math_number">
                          <field name="NUM">1</field>
                        </block>
                      </value>
                    </block>
                  </xml>`,
        disableContextMenu: true
      });
    }
  }, []);

  const getAllBlocksJSON = () => {
    if (workspace.current) {
      const blocks = workspace.current.getTopBlocks(true);
      const commands = [];
      const sortedBlocks = blocks.sort((a, b) => a.getRelativeToSurfaceXY().y - b.getRelativeToSurfaceXY().y);

      sortedBlocks.forEach(block => {
        const commandType = blockTypeToCommandType[block.type];
        if (commandType) {
          commands.push({ type: commandType });
        } else {
          console.warn(`Tipo de bloque desconocido: ${block.type}`);
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
      <button onClick={generateCode}>
        Generar Código
      </button>
      <div
        ref={blocklyDiv}
        style={{
          height: '480px',
          width: '100%',
          maxWidth: '800px',
          border: '1px solid #ccc',
          marginBottom: '30px',
          boxShadow: '0 0 10px #39ff14, 0 0 20px #00ffff',
          borderRadius: '10px',
          background: 'transparent' // Importante
        }}>
      </div>


    </div>
  );
};

export default BlocklyComponent;
