import {
  LayoutDashboard,
  Home,
  CheckSquare,
  BarChart3,
  Settings,
} from "lucide-react";

import { motion } from "framer-motion";

export default function MobileBottomNav({
  activePage,
  setActivePage,
}) {

  const navItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "focus",
      icon: Home,
    },

    {
      id: "tasks",
      icon: CheckSquare,
    },

    {
      id: "analytics",
      icon: BarChart3,
    },

    {
      id: "settings",
      icon: Settings,
    },

  ];

  return (

    <div className="
      lg:hidden

      fixed
      bottom-4
      left-1/2
      -translate-x-1/2

      z-[200]

      w-[92%]
      max-w-[450px]

      bg-black/40
      backdrop-blur-3xl

      border
      border-white/10

      rounded-[28px]

      px-3
      py-3

      flex
      items-center
      justify-between

      shadow-[0_0_40px_rgba(0,255,255,0.08)]
    ">

      {
        navItems.map((item) => {

          const Icon =
            item.icon;

          const active =
            activePage === item.id;

          return (

            <motion.button

              key={item.id}

              whileTap={{
                scale: 0.9,
              }}

              onClick={() =>
                setActivePage(
                  item.id
                )
              }

              className={`
                relative

                flex
                items-center
                justify-center

                w-[60px]
                h-[60px]

                rounded-2xl

                transition-all

                ${active
                  ? "bg-cyan-500/20"
                  : "bg-transparent"
                }
              `}
            >

              <Icon

                size={24}

                className={
                  active
                    ? "text-cyan-300"
                    : "text-gray-400"
                }
              />

              {
                active && (

                  <motion.div

                    layoutId="bubble"

                    className="
                      absolute
                      inset-0

                      rounded-2xl

                      border
                      border-cyan-400/20
                    "
                  />

                )
              }

            </motion.button>

          );

        })
      }

    </div>

  );
}