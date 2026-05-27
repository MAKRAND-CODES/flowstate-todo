// WalkingBot.jsx
import { motion } from "framer-motion";

export default function WalkingBot() {
  return (
    <div className="relative w-[500px] h-[650px] flex items-center justify-center overflow-hidden perspective-[1200px]">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[350px] h-[350px] bg-cyan-500/20 blur-[140px] rounded-full" />

      {/* FLOOR */}
      <motion.div
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="absolute bottom-20 w-72 h-10 bg-cyan-400/40 blur-3xl rounded-full"
      />

      {/* PARTICLES */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            x: Math.random() * 500 - 250,
            y: Math.random() * 700,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [null, -150],
          }}
          transition={{
            repeat: Infinity,
            duration: 4 + Math.random() * 5,
            delay: Math.random() * 3,
          }}
          className="absolute w-1 h-1 bg-cyan-300 rounded-full"
        />
      ))}

      {/* MAIN CHARACTER */}
      <motion.div
        initial={{
          x: -400,
          rotateY: -60,
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          x: 0,
          rotateY: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center"
        style={{
          transformStyle: "preserve-3d",
        }}
      >

        {/* FLOATING */}
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="relative flex flex-col items-center"
        >

          {/* HEAD */}
          <motion.div
            animate={{
              rotateZ: [0, 1.5, -1.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="relative z-30"
          >

            {/* HEAD GLOW */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-125" />

            {/* FACE */}
            <div
              className="relative w-32 h-36 rounded-[45%] overflow-hidden border border-white/10 shadow-2xl"
              style={{
                background:
                  "linear-gradient(to bottom, #ffe8d4, #f7c7a5)",
                transform: "translateZ(40px)",
              }}
            >

              {/* HAIR */}
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black via-slate-900 to-cyan-950 rounded-b-[40px]" />

              {/* HAIR DETAILS */}
              <div className="absolute top-2 left-3 w-10 h-10 bg-black rounded-full rotate-12" />
              <div className="absolute top-1 right-3 w-10 h-10 bg-slate-900 rounded-full -rotate-12" />

              {/* EYES */}
              <motion.div
                animate={{
                  scaleY: [1, 1, 0.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 3,
                  duration: 0.2,
                }}
                className="absolute top-16 left-7 w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_25px_cyan]"
              />

              <motion.div
                animate={{
                  scaleY: [1, 1, 0.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 3,
                  duration: 0.2,
                }}
                className="absolute top-16 right-7 w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_25px_cyan]"
              />

              {/* SMILE */}
              <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-10 h-4 border-b-2 border-black rounded-full" />
            </div>
          </motion.div>

          {/* BODY */}
          <div className="relative mt-3">

            {/* LEFT ARM */}
            <motion.div
              animate={{
                rotate: [25, -15, 25],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
              className="absolute top-8 -left-12 origin-top z-10"
            >
              <div className="relative w-8 h-32 rounded-full bg-gradient-to-b from-slate-700 to-black shadow-xl">

                {/* ARM GLOW */}
                <div className="absolute inset-0 bg-cyan-400/10 blur-xl rounded-full" />

                {/* HAND */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#f7c7a5] rounded-full shadow-lg" />
              </div>
            </motion.div>

            {/* RIGHT ARM */}
            <motion.div
              initial={{
                rotate: -20,
              }}
              animate={{
                rotate: [-20, -70],
              }}
              transition={{
                delay: 3,
                duration: 1,
              }}
              className="absolute top-6 -right-20 origin-left z-40"
            >
              <div className="relative w-8 h-36 rounded-full bg-gradient-to-b from-slate-700 to-black shadow-xl">

                {/* HAND */}
                <div className="absolute -top-1 right-0 w-10 h-10 bg-[#f7c7a5] rounded-full" />

                {/* POINTING FINGER */}
                <div className="absolute top-2 -right-5 w-7 h-2 rounded-full bg-[#f7c7a5]" />
              </div>
            </motion.div>

            {/* HOODIE */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 30px rgba(0,255,255,0.2)",
                  "0 0 70px rgba(0,255,255,0.45)",
                  "0 0 30px rgba(0,255,255,0.2)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="relative w-40 h-52 rounded-[40px] overflow-hidden border border-cyan-500/20"
              style={{
                background:
                  "linear-gradient(to bottom, #111827, #000000, #020617)",
                transform: "translateZ(30px)",
              }}
            >

              {/* HOOD */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-28 h-16 rounded-full bg-slate-900 border border-cyan-500/20" />

              {/* CYAN STRIP */}
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="absolute left-1/2 -translate-x-1/2 top-10 w-2 h-28 bg-cyan-400 shadow-[0_0_30px_cyan]"
              />

              {/* SHOULDER LIGHTS */}
              <div className="absolute top-7 left-5 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_cyan]" />
              <div className="absolute top-7 right-5 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_cyan]" />
            </motion.div>
          </div>

          {/* LEGS */}
          <div className="flex gap-8 mt-1">

            {/* LEFT LEG */}
            <motion.div
              animate={{
                rotate: [22, -22, 22],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
              }}
              className="origin-top"
            >
              <div className="relative w-7 h-40 rounded-full bg-gradient-to-b from-slate-700 to-slate-950">

                {/* SHOE */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px cyan",
                      "0 0 50px cyan",
                      "0 0 20px cyan",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                  }}
                  className="absolute bottom-0 -left-5 w-20 h-8 rounded-full bg-white"
                />
              </div>
            </motion.div>

            {/* RIGHT LEG */}
            <motion.div
              animate={{
                rotate: [-22, 22, -22],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
              }}
              className="origin-top"
            >
              <div className="relative w-7 h-40 rounded-full bg-gradient-to-b from-slate-700 to-slate-950">

                {/* SHOE */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px cyan",
                      "0 0 50px cyan",
                      "0 0 20px cyan",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                  }}
                  className="absolute bottom-0 -left-5 w-20 h-8 rounded-full bg-white"
                />
              </div>
            </motion.div>

          </div>

          {/* BODY AURA */}
          <motion.div
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full -z-10"
          />

        </motion.div>
      </motion.div>
    </div>
  );
}