import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import 'blockly/blocks';
import 'blockly/msg/es'; // Importa los mensajes en español

const BlocklyComponent = () => {
  const blocklyDiv = useRef(null);
  const workspace = useRef(null);

  useEffect(() => {
    // Asegúrate de que Blockly esté utilizando los mensajes en español
    Blockly.setLocale(Blockly.Msg);

    // Define bloques personalizados correctamente
    Blockly.Blocks['motor_set_speed'] = {
      init: function () {
        this.jsonInit({
          "message0": "Establecer velocidad del motor %1 a %2 %",
          "args0": [
            {
              "type": "field_dropdown",
              "name": "motor",
              "options": [
                ["1", "motor1"],
                ["2", "motor2"],
                ["3", "motor3"],
                ["4", "motor4"]
              ]
            },
            {
              "type": "field_number",
              "name": "speed",
              "value": 0,
              "min": 0,
              "max": 100
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "Establece la velocidad de un motor en porcentaje.",
          "helpUrl": ""
        });
      }
    };

    Blockly.Blocks['motor_rotate'] = {
      init: function () {
        this.jsonInit({
          "message0": "Girar motor %1 en dirección %2",
          "args0": [
            {
              "type": "field_dropdown",
              "name": "motor",
              "options": [
                ["1", "motor1"],
                ["2", "motor2"],
                ["3", "motor3"],
                ["4", "motor4"]
              ]
            },
            {
              "type": "field_dropdown",
              "name": "direction",
              "options": [
                ["hacia adelante", "forward"],
                ["hacia atrás", "backward"]
              ]
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": 160,
          "tooltip": "Gira un motor en la dirección especificada.",
          "helpUrl": ""
        });
      }
    };

    Blockly.Blocks['motor_stop'] = {
      init: function () {
        this.jsonInit({
          "message0": "Detener motor %1",
          "args0": [
            {
              "type": "field_dropdown",
              "name": "motor",
              "options": [
                ["1", "motor1"],
                ["2", "motor2"],
                ["3", "motor3"],
                ["4", "motor4"]
              ]
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

    // Define el bloque controls_repeat_ext correctamente
    Blockly.Blocks['controls_repeat_ext'] = {
      init: function() {
        this.jsonInit({
          "message0": "repetir %1 veces",
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

    // Inyectar Blockly en el div
    workspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: `<xml>
                  <block type="motor_set_speed"></block>
                  <block type="motor_rotate"></block>
                  <block type="motor_stop"></block>
                  <block type="controls_if"></block>
                  <block type="logic_compare"></block>
                  <block type="math_number"></block>
                  <block type="math_arithmetic"></block>
                  <block type="text"></block>
                  <block type="controls_repeat_ext">
                    <value name="TIMES">
                      <block type="math_number">
                        <field name="NUM">10</field>
                      </block>
                    </value>
                  </block>
                  <block type="variables_get"></block>
                  <block type="variables_set"></block>
                </xml>`
    });
  }, []);

  const generateCode = () => {
    const code = javascriptGenerator.workspaceToCode(workspace.current);
    console.log(code); // Aquí puedes enviar el código al ESP32
  };

  return (
    <div>
      <div ref={blocklyDiv} style={{ height: '480px', width: '100%', maxWidth: '800px' }}></div>
      <button onClick={generateCode}>Generar Código</button>
    </div>
  );
};

export default BlocklyComponent;
