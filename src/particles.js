import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; // Importa solo lo necesario para reducir el tamaño del bundle

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false); // Estado para controlar la inicialización

  // Inicializa las partículas una vez al montar el componente
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Carga las características necesarias del motor de partículas
      await loadSlim(engine);
    }).then(() => {
      setInit(true); // Marca como inicializado
    });
  }, []);

  // Callback cuando las partículas están completamente cargadas
  const particlesLoaded = (container) => {
    console.log("Partículas cargadas:", container);
  };

  // Configuración de las partículas, memoizada para mejorar el rendimiento
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#0", // Fondo negro
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse", // Repeler partículas al hacer clic
          },
          onHover: {
            enable: true,
            mode: "grab", // Conexión al pasar el mouse
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 15,
          },
          grab: {
            distance: 150,
          },
        },
      },
      particles: {
        color: {
          value: "#FFFFFF",
        },
        links: {
          color: "#FFFFFF",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 150,
        },
        opacity: {
          value: 1.0,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <>
      {/* Muestra un mensaje de carga mientras se inicializan las partículas */}
      {!init && <p>Cargando partículas...</p>}
      {/* Muestra las partículas después de inicializarlas */}
      {init && <Particles id={props.id} init={particlesLoaded} options={options} />}
    </>
  );
};

export default ParticlesComponent;
