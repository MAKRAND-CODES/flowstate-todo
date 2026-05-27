/*import {
  Flame,
  Zap,
  Trophy,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useStreak,
} from "../context/StreakContext";

export default function StreakCard() {

  const {
    streak,
    xp,
    level,
  } = useStreak();

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        bg-white/5
        border border-white/10
        rounded-3xl
        p-5
        backdrop-blur-xl
      "
    >

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <p className="text-gray-400 text-sm">

            Current Streak

          </p>

          <h2 className="
            text-4xl
            font-black
            flex
            items-center
            gap-2
          ">

            <Flame
              className="
                text-orange-400
              "
            />

            {streak}

          </h2>

        </div>

        <div className="text-right">

          <p className="
            text-gray-400
            text-sm
          ">

            Level

          </p>

          <h2 className="
            text-4xl
            font-black
            text-cyan-300
          ">

            {level}

          </h2>

        </div>

      </div>

      <div className="mt-5">

        <div className="
          flex
          items-center
          justify-between
          text-sm
          mb-2
        ">

          <div className="
            flex
            items-center
            gap-2
          ">

            <Zap
              size={16}
              className="
                text-yellow-300
              "
            />

            XP

          </div>

          <span>

            {xp}/100

          </span>

        </div>

        <div className="
          h-3
          bg-white/10
          rounded-full
          overflow-hidden
        ">

          <motion.div

            initial={{
              width: 0,
            }}

            animate={{
              width: `${xp % 100}%`,
            }}

            className="
              h-full
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
            "
          />

        </div>

      </div>

    </motion.div>
  );
}*/
import {
  Flame,
  Zap,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useStreak,
} from "../context/StreakContext";

export default function StreakCard() {

  const {
    streak = 0,
    xp = 0,
    level = 1,
  } = useStreak() || {};

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        bg-white/5
        border border-white/10
        rounded-3xl
        p-5
        backdrop-blur-xl
      "
    >

      {/* HEADER */}

      <div className="
        flex
        items-center
        justify-between
      ">

        {/* STREAK */}

        <div>

          <p className="
            text-gray-400
            text-sm
          ">

            Current Streak

          </p>

          <h2 className="
            text-4xl
            font-black
            flex
            items-center
            gap-2
          ">

            <Flame
              className="
                text-orange-400
              "
            />

            {streak}

          </h2>

        </div>

        {/* LEVEL */}

        <div className="text-right">

          <p className="
            text-gray-400
            text-sm
          ">

            Level

          </p>

          <h2 className="
            text-4xl
            font-black
            text-cyan-300
          ">

            {level}

          </h2>

        </div>

      </div>

      {/* XP BAR */}

      <div className="mt-5">

        <div className="
          flex
          items-center
          justify-between
          text-sm
          mb-2
        ">

          <div className="
            flex
            items-center
            gap-2
          ">

            <Zap
              size={16}
              className="
                text-yellow-300
              "
            />

            XP

          </div>

          <span>

            {xp}/100

          </span>

        </div>

        <div className="
          h-3
          bg-white/10
          rounded-full
          overflow-hidden
        ">

          <motion.div

            initial={{
              width: 0,
            }}

            animate={{
              width: `${xp}%`,
            }}

            transition={{
              duration: 0.5,
            }}

            className="
              h-full
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
            "
          />

        </div>

      </div>

    </motion.div>
  );
}