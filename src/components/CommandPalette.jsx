import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

export default function CommandPalette({
  tasks,
  open,
  setOpen,
}) {

  const [query, setQuery] = useState("");

  useEffect(() => {

    const down = (e) => {

      if (
        (e.metaKey || e.ctrlKey) &&
        e.key === "k"
      ) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", down);

    return () =>
      window.removeEventListener("keydown", down);

  }, [setOpen]);

  const filteredTasks = tasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>

      {
        open && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
          >

            <motion.div

              initial={{
                opacity: 0,
                y: -20,
                scale: 0.95,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                y: -20,
                scale: 0.95,
              }}

              transition={{
                duration: 0.2,
              }}

              className="w-full max-w-2xl bg-[#101726]/95 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >

              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">

                <Search
                  size={18}
                  className="text-gray-400"
                />

                <input
                  autoFocus

                  value={query}

                  onChange={(e) =>
                    setQuery(e.target.value)
                  }

                  placeholder="Search tasks..."

                  className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                />

              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto p-3">

                {
                  filteredTasks.length > 0 ? (

                    filteredTasks.map((task) => (

                      <button
                        key={task.id}

                        className="w-full text-left px-4 py-4 rounded-2xl hover:bg-white/5 transition mb-2"
                      >

                        <p className="font-medium">
                          {task.title}
                        </p>

                        <div className="flex gap-3 mt-1 text-xs text-gray-400">

                          <span>
                            ⚡ {task.energy}
                          </span>

                          <span>
                            ⏱ {task.time}
                          </span>

                        </div>

                      </button>
                    ))

                  ) : (

                    <div className="text-center py-10 text-gray-500">

                      No matching tasks

                    </div>
                  )
                }

              </div>

            </motion.div>

          </motion.div>
        )
      }

    </AnimatePresence>
  );
}