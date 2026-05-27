
import { useEffect, useRef, useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

export default function IntroScreen({
  onFinish,
}) {

  const [started, setStarted] =
    useState(false);

  const [phase, setPhase] =
    useState(0);

  const audioRef = useRef(null);

  /* Start Intro */
  const startIntro = async () => {

    if (started) return;

    setStarted(true);

    try {

      if (audioRef.current) {

        audioRef.current.volume = 0.65;

        await audioRef.current.play();

      }

    } catch (err) {

      console.log(err);

    }

    /* PHASES */
    setTimeout(() => setPhase(1), 1000);

    setTimeout(() => setPhase(2), 3500);

    setTimeout(() => setPhase(3), 6500);

    setTimeout(() => setPhase(4), 9500);

    setTimeout(() => {

      onFinish();

    }, 13000);

  };

  return (
    <div
      onClick={startIntro}
      className="fixed inset-0 z-[99999] bg-black overflow-hidden flex items-center justify-center cursor-pointer"
    >

      {/* AUDIO */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2997/2997-preview.mp3"
        preload="auto"
        loop
      />

      {/* DEEP SPACE BACKGROUND */}
      <div className="absolute inset-0 bg-black">

        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute w-[1200px] h-[1200px] bg-cyan-500/10 blur-[240px] rounded-full top-[-300px] left-1/2 -translate-x-1/2"
        />

        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute bottom-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-500/10 blur-[220px] rounded-full"
        />

      </div>

      {/* STAR PARTICLES */}
      {
        [...Array(120)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={started ? {
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.2, 0.5],
              x: [0, Math.random() * 120 - 60],
              y: [0, Math.random() * 120 - 60],
            } : {}}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
            }}
            className="absolute bg-cyan-300 rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: "0 0 20px #00ffff",
            }}
          />
        ))
      }

      {/* ARC REACTOR */}
      <AnimatePresence>

        {
          phase >= 1 && (
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
                rotate: -180,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 2,
                ease: "easeOut",
              }}
              className="absolute"
            >

              {/* OUTER RING */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-[320px] h-[320px] rounded-full border border-cyan-400/40 flex items-center justify-center"
              >

                <motion.div
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-[220px] h-[220px] rounded-full border border-blue-400/50 flex items-center justify-center"
                >

                  {/* CORE */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="w-24 h-24 rounded-full bg-cyan-300 shadow-[0_0_120px_#00ffff]"
                  />

                </motion.div>

              </motion.div>

            </motion.div>
          )
        }

      </AnimatePresence>

      {/* FLOWSTATE LOGO MORPH */}
      <AnimatePresence>

        {
          phase >= 2 && (
            <motion.div
              initial={{
                opacity: 0,
                letterSpacing: "40px",
                scale: 0.5,
                filter: "blur(20px)",
              }}
              animate={{
                opacity: 1,
                letterSpacing: "10px",
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 2.5,
              }}
              className="absolute text-center"
            >

              <motion.h1
                animate={{
                  textShadow: [
                    "0 0 20px #00ffff",
                    "0 0 60px #00ffff",
                    "0 0 20px #00ffff",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-6xl md:text-8xl font-black tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400"
              >

                FLOWSTATE

              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-cyan-200/70 tracking-[0.6em] uppercase text-sm"
              >

                Neural Productivity System

              </motion.p>

            </motion.div>
          )
        }

      </AnimatePresence>

      {/* HUD UI */}
      {
        phase >= 3 && (
          <>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-10 top-10 border border-cyan-400/30 bg-white/5 backdrop-blur-xl rounded-2xl p-5 w-64"
            >

              <p className="text-cyan-300 text-sm mb-2">
                Focus Synchronization
              </p>

              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 2 }}
                  className="h-full bg-cyan-400"
                />
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-10 bottom-10 border border-purple-400/30 bg-white/5 backdrop-blur-xl rounded-2xl p-5 w-72"
            >

              <p className="text-purple-300 text-sm mb-2">
                Neural Flow Activated
              </p>

              <h2 className="text-3xl font-bold text-white">
                98%
              </h2>

            </motion.div>

          </>
        )
      }

      {/* FINAL BUTTON */}
      {
        phase >= 4 && (
          <motion.button
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 60px #00ffff",
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            className="absolute bottom-20 px-10 py-5 rounded-3xl bg-cyan-400/20 border border-cyan-300/40 backdrop-blur-2xl text-white font-semibold tracking-wider"
          >

            ENTER FLOWSTATE

          </motion.button>
        )
      }

      {/* CLICK MESSAGE */}
      {
        !started && (
          <motion.div
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute bottom-16 text-gray-400 tracking-[0.3em] text-sm"
          >

            CLICK TO INITIALIZE FLOWSTATE

          </motion.div>
        )
      }

    </div>
  );
}
