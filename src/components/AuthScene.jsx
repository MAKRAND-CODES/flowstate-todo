import { motion } from "framer-motion";

export default function AuthScene() {

  return (

    <div className="absolute inset-0 overflow-hidden">

      {/* BACKGROUND */}
      <div className="
        absolute
        inset-0
        bg-gradient-to-br
        from-black
        via-[#050816]
        to-[#02030a]
      " />

      {/* CYAN GLOW */}
      <div className="
        absolute
        top-[-20%]
        left-[-10%]
        w-[600px]
        h-[600px]
        bg-cyan-500/20
        blur-[180px]
        rounded-full
      " />

      {/* PURPLE GLOW */}
      <div className="
        absolute
        bottom-[-20%]
        right-[-10%]
        w-[600px]
        h-[600px]
        bg-purple-500/20
        blur-[180px]
        rounded-full
      " />

      {/* GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.05]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* PARTICLES */}
      {[...Array(35)].map((_, i) => (

        <motion.div
          key={i}

          initial={{
            opacity: 0,
            y: Math.random() * 1000,
            x: Math.random() * 1600,
          }}

          animate={{
            opacity: [0, 1, 0],
            y: [
              Math.random() * 1000,
              Math.random() * 1000 - 300,
            ],
          }}

          transition={{
            duration: 5 + Math.random() * 8,
            repeat: Infinity,
          }}

          className="
            absolute
            w-[2px]
            h-[2px]
            bg-cyan-300
            rounded-full
            shadow-[0_0_15px_#00ffff]
          "
        />

      ))}

      {/* SCAN LIGHT */}
      <motion.div

        initial={{
          y: -200,
        }}

        animate={{
          y: "120vh",
        }}

        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}

        className="
          absolute
          inset-x-0
          h-[100px]
          bg-cyan-400/10
          blur-3xl
        "
      />

    </div>
  );
}