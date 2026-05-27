import { motion } from "framer-motion";
import {
  X,
  Pause,
  Play,
  Music2,
} from "lucide-react";

export default function DeepFocusMode({
  task,
  secondsLeft,
  isRunning,
  setIsRunning,
  closeMode,
}) {

  /* Time */
  const hours =
    Math.floor(secondsLeft / 3600);

  const minutes =
    Math.floor(
      (secondsLeft % 3600) / 60
    );

  const seconds =
    secondsLeft % 60;

  return (
    <motion.div

      initial={{
        opacity: 0,
      }}

      animate={{
        opacity: 1,
      }}

      exit={{
        opacity: 0,
      }}

      className="fixed inset-0 z-[999] bg-[#030712] flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden px-6 py-10"
    >

      {/* Massive Ambient Glow */}
      <div className="absolute w-[800px] h-[800px] bg-blue-500/20 blur-[240px] rounded-full"></div>

      <div className="absolute bottom-[-200px] w-[500px] h-[500px] bg-cyan-400/10 blur-[180px] rounded-full"></div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>

      {/* Close */}
      <button
        onClick={closeMode}

        className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition border border-white/10 backdrop-blur-xl z-20"
      >

        <X />

      </button>

      {/* Main Content */}
      <div className="relative z-10 text-center w-full max-w-6xl">

        {/* Session Label */}
        <p className="uppercase tracking-[0.35em] text-gray-500 text-sm mb-6">

          Deep Focus Session

        </p>

        {/* Task */}
        <h1 className="text-4xl md:text-6xl font-semibold mb-10 leading-tight">

          {task?.title}

        </h1>

        {/* Timer */}
        <motion.div

          animate={{
            scale: [1, 1.03, 1],
          }}

          transition={{
            duration: 3,
            repeat: Infinity,
          }}

          className="text-[70px] md:text-[170px] font-bold tracking-wider leading-none mb-10 bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent"
        >

          {String(hours).padStart(2, "0")}:
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}

        </motion.div>

        {/* Controls */}
        <div className="flex justify-center gap-5 mb-12">

          <button
            onClick={() =>
              setIsRunning(
                !isRunning
              )
            }

            className="w-20 h-20 rounded-3xl bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition shadow-2xl shadow-blue-500/30"
          >

            {
              isRunning ? (
                <Pause size={32} />
              ) : (
                <Play size={32} />
              )
            }

          </button>

        </div>

        {/* Spotify Workspace */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-2xl shadow-2xl shadow-black/30 mb-20">

          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-4">

            <Music2 className="text-green-400" />

            <h2 className="text-3xl font-semibold">
              Spotify Workspace
            </h2>

          </div>

          <p className="text-gray-400 mb-8 text-center max-w-2xl mx-auto">

            Search songs, artists, albums,
            playlists, and create your ultimate
            immersive focus environment.

          </p>

          {/* Real Spotify Search */}
          

        </div>

      </div>

    </motion.div>
  );
}