import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/msg/es'; // Importa los mensajes en español

const BlocklyComponent = () => {
  const blocklyDiv = useRef(null);
  const workspace = useRef(null);

  const blockTypeToCommandType = {
    girar_derecha: "turn_right",
    girar_izquierda: "turn_left",
    mover_adelante: "move_forward",
    mover_atras: "move_backward",
    motor_stop: "stop_motor",
    // Agrega más mapeos si tienes otros tipos de bloques
  };

  const arrowForward = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M11.293%204.707%2017.586%2011H4v2h13.586l-6.293%206.293%201.414%201.414L21.414%2012l-8.707-8.707-1.414%201.414z%22/%3E%3C/svg%3E';
  const arrowBackward = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22m12.718%204.707-1.413-1.415L2.585%2012l8.72%208.707%201.413-1.415L6.417%2013H20v-2H6.416l6.302-6.293z%22/%3E%3C/svg%3E';
  const arrowRight = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='655.359' height='655.359' style='shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd' viewBox='0 0 6.827 6.827'%3E%3Cdefs%3E%3Cstyle%3E.fil0%7Bfill:none%7D.fil1%7Bfill:%23212121;fill-rule:nonzero%7D%3C/style%3E%3C/defs%3E%3Cg id='Layer_x0020_1'%3E%3Cg id='_372409264'%3E%3Cpath id='_372409288' class='fil0' d='M0 0h6.827v6.827H0z'/%3E%3Cpath id='_372409216' class='fil0' d='M.853.853h5.12v5.12H.853z'/%3E%3C/g%3E%3Cpath class='fil1' d='M3.076 5.646a1.85 1.85 0 0 1-.195-.051l-.066.203c.072.023.144.042.217.057l.044-.209zm2.19-1.275-.003.01-.004.01-.003.009-.003.01-.003.009-.004.01-.003.009-.004.01-.003.009-.004.009-.003.01-.004.008-.003.01-.004.009-.004.009.198.081.004-.01.004-.01.004-.01.004-.01.004-.011.004-.01.004-.011.003-.01.004-.01.004-.011.004-.01.003-.011.004-.011.003-.01.004-.011-.203-.066zm-.138.323-.003.005-.004.008-.005.009-.005.008-.005.009-.005.008-.004.009-.005.008-.005.008-.005.009-.005.008-.006.008-.005.008-.005.009-.005.008-.005.008-.006.008-.005.008-.005.008-.006.008-.005.008-.002.002.176.122.001-.003.007-.009.006-.009.006-.009.006-.009.005-.009.006-.009.006-.009.006-.01.006-.008.005-.01.006-.009.006-.009.005-.01.006-.009.005-.009.005-.01.006-.009.005-.01.005-.009.006-.01.002-.004-.187-.102zm-.229.332-.005.006-.006.007-.007.007-.006.007-.006.007-.007.008-.006.007-.007.007-.006.007-.007.007-.006.006-.007.007-.007.007-.007.007-.006.007-.007.007-.007.006-.007.007-.007.007-.006.006-.007.007-.003.002.146.156.003-.003.008-.007.007-.008.008-.007.008-.007.007-.008.008-.007.007-.008.008-.008.007-.007.007-.008.008-.007.007-.008.007-.008.008-.008.007-.008.007-.008.007-.008.007-.008.005-.005-.16-.14zm-.294.276-.004.003-.008.006-.007.005-.008.006-.008.006-.007.005-.008.006-.008.005-.008.006-.008.005-.008.005-.007.006-.008.005-.008.005-.008.006-.008.005-.008.005-.009.005-.008.005-.008.005-.005.003.11.183.006-.004.009-.005.009-.006.009-.005.009-.006.009-.006.009-.005.009-.006.008-.006.01-.006.008-.006.009-.006.009-.006.008-.006.009-.006.009-.006.008-.006.009-.007.008-.006.009-.006.008-.006.004-.003-.128-.171zm-.346.208h-.001l-.009.005-.009.004-.008.003-.009.004-.009.004-.009.004-.008.004-.01.003-.008.004-.009.004-.009.003-.009.004-.009.003-.009.004-.009.003-.009.003-.009.004-.009.003-.009.003-.009.003-.008.003.069.202.009-.003.01-.004.01-.003.01-.004.01-.004.01-.003.01-.004.01-.004.01-.004.01-.004.01-.004.01-.004.01-.004.009-.004.01-.004.01-.005.01-.004.009-.004.01-.005h.001l-.09-.194zm-.381.13h-.002l-.01.002-.009.002-.01.002-.009.002-.01.002-.009.002-.01.002-.009.002-.01.001-.01.002-.009.002-.01.001-.009.002-.01.001-.01.002h-.009l-.01.002-.01.001-.009.002h-.01l-.005.002.024.212.006-.001.011-.002h.01l.012-.002.01-.002.011-.001.01-.002.012-.002.01-.001.011-.002.01-.002.011-.002.011-.002.01-.001.011-.002.011-.003.01-.002.011-.002.01-.002.011-.002.01-.003h.002l-.046-.208zm-.4.046h-.07l-.01-.001h-.01l-.01-.001H3.36l-.002-.001h-.016l-.002-.001H3.327l-.002-.001h-.012l-.002-.001H3.302L3.3 5.678h-.01l-.002-.001H3.28l-.002-.001h-.002l-.022.212h.008l.002.001H3.273l.002.001H3.286l.002.001H3.299l.002.001h.011l.002.001H3.327l.002.001h.015l.002.001H3.357l.011.001h.011l.011.001h.033l.012.001H3.478v-.213zM3.322 1.9a1.89 1.89 0 0 0-1.133.485 1.893 1.893 0 0 0 .691 3.21l-.065.202a2.105 2.105 0 0 1-1.46-2.11c.03-.582.292-1.097.692-1.46a2.103 2.103 0 0 1 1.198-.534l.142.142-.065.065z'/%3E%3Cpath style='fill:%2366bb6a;fill-rule:nonzero' d='m2.964.959.8.8.076.076-.076.075-.8.801-.151-.15.725-.726-.725-.726z'/%3E%3C/g%3E%3C/svg%3E";
  const arrowLeft = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='655.359' height='655.359' style='shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd' viewBox='0 0 6.827 6.827'%3E%3Cdefs%3E%3Cstyle%3E.fil0%7Bfill:none%7D.fil1%7Bfill:%23212121;fill-rule:nonzero%7D%3C/style%3E%3C/defs%3E%3Cg id='Layer_x0020_1'%3E%3Cg id='_372408592'%3E%3Cpath id='_372408376' class='fil0' d='M0 0h6.827v6.827H0z'/%3E%3Cpath id='_372408568' class='fil0' d='M.853.853h5.12v5.12H.853z'/%3E%3C/g%3E%3Cpath class='fil1' d='M3.794 5.855a2.09 2.09 0 0 0 .217-.057l-.065-.203c-.064.02-.13.038-.195.051l.043.21zM1.358 4.437l.003.01.004.011.003.01.004.011.004.01.003.011.004.01.004.011.004.01.004.01.004.011.004.01.004.01.004.01.004.011.197-.081-.003-.01-.004-.008-.004-.01-.003-.009-.004-.01-.003-.009-.004-.009-.003-.01-.004-.009-.003-.01-.003-.009L1.57 4.4l-.003-.01-.003-.009-.003-.01-.203.066zm.154.36.002.004.005.01.006.009.005.01.005.009.006.009.005.01.006.009.005.009.006.01.005.009.006.009.006.009.006.009.005.01.006.008.006.01.006.008.006.01.006.008.006.009.002.003.175-.122-.001-.002-.005-.008-.006-.008-.005-.008-.006-.008-.005-.008-.005-.008-.006-.009-.005-.008-.005-.008-.005-.008-.005-.009-.005-.008-.004-.009-.005-.008-.005-.009-.005-.008-.002-.005-.187.102zm.254.369.005.005.007.008.007.008.008.008.007.008.007.008.007.008.008.008.007.007.007.008.008.008.007.007.008.008.007.008.008.007.007.008.008.007.007.007.008.008.008.007.003.003.145-.156-.002-.002-.007-.007-.007-.006-.007-.007-.007-.007-.006-.006-.007-.007-.007-.007-.006-.007-.007-.007-.006-.007-.007-.007-.006-.008-.006-.007-.007-.007-.006-.007-.006-.007-.005-.006-.162.14zm.327.307.004.003.009.006.008.006.009.006.008.007.01.006.008.006.008.006.01.006.008.006.009.006.008.006.01.006.008.006.009.006.009.005.009.006.009.006.009.005.009.006.009.005.006.004.11-.183-.006-.003-.008-.005-.008-.005-.008-.005-.008-.005-.008-.006-.008-.005-.008-.005-.008-.006-.008-.005-.008-.005-.007-.006-.008-.005-.008-.006-.008-.005-.007-.006-.008-.006-.008-.005-.007-.006-.004-.003-.129.17zm.385.23.001.001.01.005.01.004.01.004.009.005.01.004.01.004.01.004.01.004.009.004.01.004.01.004.01.004.01.004.01.003.01.004.01.004.01.003.01.004.009.003.069-.202-.009-.003-.009-.003-.009-.003-.009-.003-.009-.004-.009-.003-.009-.003-.009-.004-.009-.003-.008-.004-.01-.003-.008-.004-.01-.004-.008-.003-.009-.004-.009-.004-.008-.004-.01-.004-.008-.004-.009-.003-.008-.004-.002-.001-.09.193zm.424.145h.002l.01.003.01.002.011.002.011.002.01.002.011.003.01.002.012.001.01.002.01.002.012.002.01.002.011.001.01.002.011.002.011.001.011.002.01.001.012.001.01.002h.007l.024-.211-.006-.001-.01-.001-.009-.002h-.01l-.01-.002-.01-.001-.009-.002-.01-.001-.009-.002-.01-.001-.01-.002-.009-.002-.01-.002-.009-.002-.009-.002-.01-.002H2.95l-.047.208zm.446.051H3.425l.011-.001h.022l.012-.001h.011l.002-.001h.013l.002-.001h.013l.002-.001H3.526l.002-.001H3.539l.002-.001H3.55l.002-.001h.008l.002-.001H3.571l.001-.001-.02-.212h-.013l-.002.001h-.008l-.002.001h-.012l-.002.001H3.502l-.002.001h-.012l-.002.001H3.471l-.002.001h-.01l-.01.001h-.02l-.01.001h-.07V5.9z'/%3E%3Cpath class='fil1' d='M3.581 1.693c.457.047.874.24 1.199.535a2.105 2.105 0 0 1-.769 3.57l-.065-.203a1.892 1.892 0 0 0 1.312-1.899 1.89 1.89 0 0 0-.62-1.31A1.89 1.89 0 0 0 3.503 1.9l-.065-.065.142-.142z'/%3E%3Cpath style='fill:%2366bb6a;fill-rule:nonzero' d='m4.014 1.11-.726.725.726.725-.151.151-.8-.8-.076-.076.075-.076.801-.8z'/%3E%3C/g%3E%3C/svg%3E";
  const stop = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath fill='%23f87670' d='m11.276 46.125-9.401-9.401V11.277l9.401-9.402h25.447l9.402 9.402v25.447l-9.402 9.401H11.276z'/%3E%3Cpath d='M37.5 0h-27L0 10.5v27L10.5 48h27L48 37.5v-27zm6.75 35.948-8.3 8.3H12.053l-8.3-8.3V12.053l8.3-8.3h23.894l8.3 8.3z' fill='%23db5743'/%3E%3Cpath d='M35.516 22.36a1.793 1.793 0 0 0-1.526.363 2.259 2.259 0 0 0-.8 1.753v4.847a3.281 3.281 0 0 1-.861 2.239l-1.075 1.163a.75.75 0 1 1-1.1-1.018l1.075-1.163a1.814 1.814 0 0 0 .463-1.222V13a1.658 1.658 0 0 0-1.655-1.655A1.654 1.654 0 0 0 28.376 13v8.72a.75.75 0 0 1-1.5 0V9.4a1.655 1.655 0 1 0-3.309 0V22.471a.75.75 0 0 1-1.5 0v-11.8a1.656 1.656 0 1 0-3.311 0V23.22a.75.75 0 0 1-1.5 0v-8.931a1.655 1.655 0 1 0-3.309 0v23.532a2.439 2.439 0 0 0 2.436 2.436h14.161a3.8 3.8 0 0 0 2.683-1.12l2.652-2.687a4.641 4.641 0 0 0 1.175-3.111v-8.754a2.211 2.211 0 0 0-1.538-2.225z' fill='%23fff'/%3E%3C/svg%3E";

  useEffect(() => {
    Blockly.setLocale(Blockly.Msg);

    // Definición de los bloques personalizados
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

    // Definir el bloque de repetir correctamente
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

    // Inyectar Blockly en el div
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
                </xml>`
    });
  }, []);

  // Función para obtener todos los bloques y sus detalles
  const getAllBlocksJSON = () => {
    if (workspace.current) {
      const blocks = workspace.current.getTopBlocks(true); // Obtener los bloques superiores
      const commands = [];

      // Ordenar los bloques según su posición Y para mantener el orden visual
      const sortedBlocks = blocks.sort((a, b) => a.getRelativeToSurfaceXY().y - b.getRelativeToSurfaceXY().y);
      console.log("Bloques ordenados:", sortedBlocks);

      sortedBlocks.forEach(block => {
        const commandType = blockTypeToCommandType[block.type];
        if (commandType) {
          commands.push({ type: commandType });
          console.log("Comando:", commandType);
        } else {
          console.warn(`Tipo de bloque desconocido: ${block.type}`);
        }
      });

      const json = { commands };
      console.log("JSON generado:", JSON.stringify(json, null, 2));
      return json;
    } else {
      console.warn("workspace.current es undefined");
    }
    return null;
  };

  const generateCode = () => {
    console.log("Generando código...");
    const json = getAllBlocksJSON();
    if (json) {
      console.log("Código generado:", json);
    } else {
      console.log("No se generó código.");
    }
  };

  return (
    <div>
      <div ref={blocklyDiv} style={{ height: '480px', width: '100%', maxWidth: '800px' }}></div>
      <button onClick={generateCode}>Generar Código</button>
    </div>
  );
};

export default BlocklyComponent;
