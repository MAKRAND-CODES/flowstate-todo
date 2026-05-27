/*import { motion } from "framer-motion";
import { Check, Pause, Scissors } from "lucide-react";

export default function FocusCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}

            whileHover={{
                rotateX: 4,
                rotateY: -4,
                scale: 1.02,
            }}

            style={{
                transformStyle: "preserve-3d",
            }}

            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300"
        >
            <div className="mb-8">
                <p className="text-xs text-blue-300 mb-2">
                    CURRENT FOCUS
                </p>

                <h2 className="text-3xl font-semibold leading-tight">
                    Design Ultra UI Todo Experience
                </h2>

                <div className="flex gap-4 mt-4 text-sm text-gray-300">
                    <span>⚡ High Energy</span>
                    <span>⏱ 45 min</span>
                    <span>🧠 Deep Work</span>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 transition"
            >
                <Check size={16} />
                Done
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 transition"
            >
                <Check size={16} />
                Snooze
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 transition"
            >
                <Check size={16} />
                BreakDown
            </motion.button>
        </motion.div>
    );
}*/
import { motion, AnimatePresence } from "framer-motion";
import { Check, Pause, Scissors } from "lucide-react";

export default function FocusCard({ task, nextTask }) {

  return (
    <AnimatePresence mode="wait">

      <motion.div
        key={task.id}

        initial={{
          opacity: 0,
          y: 60,
          scale: 0.95,
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}

        exit={{
          opacity: 0,
          y: -60,
          scale: 0.9,
        }}

        transition={{
          duration: 0.5,
        }}

        whileHover={{
          rotateX: 4,
          rotateY: -4,
          scale: 1.02,
        }}

        style={{
          transformStyle: "preserve-3d",
        }}

        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300"
      >

        <div className="mb-8">

          <p className="text-xs text-blue-300 mb-2">
            CURRENT FOCUS
          </p>

          <h2 className="text-3xl font-semibold leading-tight">
            {task.title}
          </h2>

          <div className="flex gap-4 mt-4 text-sm text-gray-300">
            <span>⚡ {task.energy}</span>
            <span>⏱ {task.time}</span>
            <span>🧠 {task.type}</span>
          </div>

        </div>

        <div className="flex gap-3 flex-wrap">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextTask}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 transition"
          >
            <Check size={16} />
            Done
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            <Pause size={16} />
            Snooze
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            <Scissors size={16} />
            Break Down
          </motion.button>

        </div>

      </motion.div>

    </AnimatePresence>
  );
}