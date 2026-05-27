import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function FloatingAddButton({

  addTask,

}) {

  const [open, setOpen] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const createTask = () => {

    if (!title.trim()) return;

    addTask({

      title,

      energy: "Medium",

      time: "25 minutes",

      deadline: "Today",

    });

    setTitle("");

    setOpen(false);

  };

  return (

    <>

      {/* FAB BUTTON */}

      <motion.button

        whileHover={{
          scale: 1.08,
        }}

        whileTap={{
          scale: 0.94,
        }}

        onClick={() =>
          setOpen(true)
        }

        className="
          fixed
          bottom-24
          right-5

          z-[250]

          w-16
          h-16

          rounded-full

          bg-gradient-to-r
          from-cyan-400
          to-blue-500

          flex
          items-center
          justify-center

          shadow-[0_0_35px_rgba(0,255,255,0.45)]

          lg:hidden
        "
      >

        <Plus
          size={30}
          className="text-white"
        />

      </motion.button>

      {/* MODAL */}

      <AnimatePresence>

        {

          open && (

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

              className="
                fixed
                inset-0

                z-[300]

                bg-black/60
                backdrop-blur-md

                flex
                items-end
                justify-center

                px-4
                pb-8
              "
            >

              <motion.div

                initial={{
                  y: 400,
                }}

                animate={{
                  y: 0,
                }}

                exit={{
                  y: 400,
                }}

                transition={{
                  type: "spring",
                  damping: 20,
                }}

                className="
                  w-full
                  max-w-md

                  bg-[#111827]

                  border
                  border-white/10

                  rounded-3xl

                  p-6
                "
              >

                {/* TOP */}

                <div className="
                  flex
                  items-center
                  justify-between
                  mb-6
                ">

                  <h2 className="
                    text-xl
                    font-bold
                    text-white
                  ">

                    Quick Add

                  </h2>

                  <button
                    onClick={() =>
                      setOpen(false)
                    }
                  >

                    <X
                      size={24}
                      className="text-gray-400"
                    />

                  </button>

                </div>

                {/* INPUT */}

                <input

                  value={title}

                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }

                  placeholder="Enter task..."

                  className="
                    w-full

                    bg-black/30

                    border
                    border-white/10

                    rounded-2xl

                    px-5
                    py-4

                    text-white

                    outline-none

                    mb-5
                  "
                />

                {/* BUTTON */}

                <button

                  onClick={createTask}

                  className="
                    w-full

                    py-4

                    rounded-2xl

                    bg-gradient-to-r
                    from-cyan-400
                    to-blue-500

                    text-white
                    font-semibold
                  "
                >

                  Create Task

                </button>

              </motion.div>

            </motion.div>

          )

        }

      </AnimatePresence>

    </>

  );
}