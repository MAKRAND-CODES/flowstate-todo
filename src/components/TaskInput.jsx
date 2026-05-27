/*import { motion } from "framer-motion";

export default function TaskInput() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-8"
    >
      <input
        placeholder="What’s next?"
        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-blue-400 transition"
      />
    </motion.div>
  );
}*/
/*import { useState } from "react";
import { motion } from "framer-motion";

export default function TaskInput({ addTask }) {

  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask(value);

    setValue("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}

      transition={{ delay: 0.5 }}

      className="mt-8"
    >

      <input
        value={value}

        onChange={(e) =>
          setValue(e.target.value)
        }

        placeholder="What’s next?"

        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-blue-400 transition"
      />

    </motion.form>
  );
}*/
import { useState } from "react";
import { motion } from "framer-motion";

export default function TaskInput({ addTask }) {

  const [title, setTitle] = useState("");

  const [timeValue, setTimeValue] =
    useState("");

  const [timeUnit, setTimeUnit] =
    useState("minutes");

  const [energy, setEnergy] =
    useState("Medium Energy");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!title.trim()) return;

    const formattedTime =
      `${timeValue} ${timeUnit}`;

    addTask({
      title,
      time: formattedTime,
      energy,
    });

    setTitle("");

    setTimeValue("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}

      transition={{ delay: 0.5 }}

      className="mt-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5"
    >

      <input
        value={title}

        onChange={(e) =>
          setTitle(e.target.value)
        }

        placeholder="What’s next?"

        className="w-full px-5 py-4 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-blue-400 transition mb-4"
      />

      <div className="flex gap-3 flex-wrap">

        {/* Custom Time */}
        <input
          type="number"

          value={timeValue}

          onChange={(e) =>
            setTimeValue(e.target.value)
          }

          placeholder="Time"

          className="w-[120px] px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none"
        />

        {/* Time Unit */}
        <select
          value={timeUnit}

          onChange={(e) =>
            setTimeUnit(e.target.value)
          }

          className="px-4 py-3 rounded-xl bg-black/20 border border-white/10"
        >

          <option>seconds</option>
          <option>minutes</option>
          <option>hours</option>

        </select>

        {/* Energy */}
        <select
          value={energy}

          onChange={(e) =>
            setEnergy(e.target.value)
          }

          className="px-4 py-3 rounded-xl bg-black/20 border border-white/10"
        >

          <option>Low Energy</option>
          <option>Medium Energy</option>
          <option>High Energy</option>

        </select>

        {/* Add Button */}
        <button
          className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition"
        >
          Add Task
        </button>

      </div>

    </motion.form>
  );
}