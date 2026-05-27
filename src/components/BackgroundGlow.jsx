/*import { motion } from "framer-motion";

export default function BackgroundGlow() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full top-0 left-0"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full bottom-0 right-0"
      />
    </>
  );
}*/
import { motion } from "framer-motion";

export default function BackgroundGlow({ mood }) {

  const moods = {
    focus: {
      color1: "bg-blue-500/20",
      color2: "bg-cyan-500/20",
    },

    creative: {
      color1: "bg-purple-500/20",
      color2: "bg-pink-500/20",
    },

    overload: {
      color1: "bg-orange-500/20",
      color2: "bg-red-500/20",
    },

    calm: {
      color1: "bg-green-500/20",
      color2: "bg-emerald-500/20",
    },
  };

  const currentMood = moods[mood];

  return (
    <>
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute w-[500px] h-[500px] ${currentMood.color1} blur-[120px] rounded-full top-0 left-0`}
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute w-[500px] h-[500px] ${currentMood.color2} blur-[120px] rounded-full bottom-0 right-0`}
      />
    </>
  );
}