import {
  LayoutDashboard,
  Home,
  CheckSquare,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useState,
} from "react";

export default function Sidebar({
  activePage,
  setActivePage,
  focusScore,
}) {

  const [open, setOpen] =
    useState(false);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "focus",
      label: "Focus",
      icon: Home,
    },

    {
      id: "tasks",
      label: "Tasks",
      icon: CheckSquare,
    },

    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
    },

    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },

  ];

  return (

    <>

      {/* ================= MOBILE TOP BAR ================= */}

      <div className="
        lg:hidden
        fixed
        top-0
        left-0
        right-0
        z-[120]
        h-[70px]
        px-5
        flex
        items-center
        justify-between
        bg-black/40
        backdrop-blur-2xl
        border-b
        border-white/10
      ">

        <h1 className="
          text-xl
          font-bold
          text-white
        ">

          FlowState

        </h1>

        <button
          onClick={() =>
            setOpen(true)
          }

          className="
            p-2
            rounded-xl
            bg-white/5
            border
            border-white/10
          "
        >

          <Menu size={22} />

        </button>

      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}

      <div className="
        hidden
        lg:flex

        w-[260px]
        h-[90vh]

        bg-white/5
        border
        border-white/10

        rounded-3xl

        backdrop-blur-2xl

        flex-col

        p-5
      ">

        <h1 className="
          text-3xl
          font-black
          mb-10
        ">

          FlowState

        </h1>

        <div className="
          flex
          flex-col
          gap-3
        ">

          {
            navItems.map((item) => {

              const Icon =
                item.icon;

              return (

                <button
                  key={item.id}

                  onClick={() =>
                    setActivePage(
                      item.id
                    )
                  }

                  className={`
                    flex
                    items-center
                    gap-3

                    px-4
                    py-4

                    rounded-2xl

                    transition-all

                    ${activePage === item.id
                      ? "bg-cyan-500/20 border border-cyan-400/20"
                      : "hover:bg-white/5"
                    }
                  `}
                >

                  <Icon size={20} />

                  <span>

                    {item.label}

                  </span>

                </button>

              );

            })
          }

        </div>

        {/* SCORE */}

        <div className="
          mt-auto
          bg-black/30
          rounded-2xl
          p-4
          border
          border-white/10
        ">

          <p className="
            text-sm
            text-gray-400
          ">

            Focus Score

          </p>

          <h2 className="
            text-4xl
            font-bold
            mt-2
          ">

            {focusScore}%

          </h2>

        </div>

      </div>

      {/* ================= MOBILE DRAWER ================= */}

      <AnimatePresence>

        {
          open && (

            <>

              {/* OVERLAY */}

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

                onClick={() =>
                  setOpen(false)
                }

                className="
                  fixed
                  inset-0
                  bg-black/60
                  z-[140]
                "
              />

              {/* DRAWER */}

              <motion.div

                initial={{
                  x: -320,
                }}

                animate={{
                  x: 0,
                }}

                exit={{
                  x: -320,
                }}

                transition={{
                  type: "spring",
                  damping: 24,
                }}

                className="
                  fixed
                  top-0
                  left-0
                  bottom-0

                  w-[280px]

                  bg-[#070B14]/95

                  backdrop-blur-3xl

                  border-r
                  border-white/10

                  z-[150]

                  p-5

                  flex
                  flex-col
                "
              >

                {/* HEADER */}

                <div className="
                  flex
                  items-center
                  justify-between
                  mb-10
                ">

                  <h1 className="
                    text-2xl
                    font-black
                  ">

                    FlowState

                  </h1>

                  <button
                    onClick={() =>
                      setOpen(false)
                    }
                  >

                    <X size={24} />

                  </button>

                </div>

                {/* NAV */}

                <div className="
                  flex
                  flex-col
                  gap-3
                ">

                  {
                    navItems.map((item) => {

                      const Icon =
                        item.icon;

                      return (

                        <button
                          key={item.id}

                          onClick={() => {

                            setActivePage(
                              item.id
                            );

                            setOpen(false);

                          }}

                          className={`
                            flex
                            items-center
                            gap-3

                            px-4
                            py-4

                            rounded-2xl

                            transition-all

                            ${activePage === item.id
                              ? "bg-cyan-500/20 border border-cyan-400/20"
                              : "hover:bg-white/5"
                            }
                          `}
                        >

                          <Icon size={20} />

                          <span>

                            {item.label}

                          </span>

                        </button>

                      );

                    })
                  }

                </div>

                {/* SCORE */}

                <div className="
                  mt-auto
                  bg-black/30
                  rounded-2xl
                  p-4
                  border
                  border-white/10
                ">

                  <p className="
                    text-sm
                    text-gray-400
                  ">

                    Focus Score

                  </p>

                  <h2 className="
                    text-4xl
                    font-bold
                    mt-2
                  ">

                    {focusScore}%

                  </h2>

                </div>

              </motion.div>

            </>

          )
        }

      </AnimatePresence>

    </>

  );
}