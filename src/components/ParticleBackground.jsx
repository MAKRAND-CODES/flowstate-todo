import Particles from "react-tsparticles";

import { loadFull } from "tsparticles";

export default function ParticleBackground() {

  const particlesInit =
    async (engine) => {

      await loadFull(engine);

    };

  return (
    <Particles

      id="tsparticles"

      init={particlesInit}

      options={{
        fullScreen: {
          enable: false,
        },

        background: {
          color: {
            value: "transparent",
          },
        },

        particles: {
          number: {
            value: 40,
          },

          color: {
            value: "#60a5fa",
          },

          links: {
            enable: true,
            color: "#60a5fa",
            opacity: 0.2,
          },

          move: {
            enable: true,
            speed: 1,
          },

          opacity: {
            value: 0.25,
          },

          size: {
            value: 3,
          },
        },
      }}

      className="absolute inset-0 z-0"
    />
  );
}