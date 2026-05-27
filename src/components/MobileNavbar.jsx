import {
  House,
  CheckSquare,
  BarChart3,
  Settings,
} from "lucide-react";

export default function MobileNavbar({

  activePage,
  setActivePage,

}) {

  const navItems = [

    {
      id: "focus",
      icon: House,
      label: "Focus",
    },

    {
      id: "tasks",
      icon: CheckSquare,
      label: "Tasks",
    },

    {
      id: "analytics",
      icon: BarChart3,
      label: "Stats",
    },

    {
      id: "settings",
      icon: Settings,
      label: "Settings",
    },

  ];

  return (

    <div className="
      fixed
      bottom-4
      left-1/2
      -translate-x-1/2

      z-[200]

      flex
      items-center
      justify-around

      w-[92%]
      max-w-[500px]

      px-3
      py-3

      rounded-3xl

      bg-white/10
      backdrop-blur-2xl

      border
      border-white/10

      shadow-[0_0_40px_rgba(0,255,255,0.08)]

      lg:hidden
    ">

      {

        navItems.map((item) => {

          const Icon = item.icon;

          const active =
            activePage === item.id;

          return (

            <button

              key={item.id}

              onClick={() =>
                setActivePage(item.id)
              }

              className="
                flex
                flex-col
                items-center
                justify-center

                gap-1

                px-3
                py-2

                rounded-2xl

                transition-all
                duration-300
              "

            >

              <div className={`
                p-2
                rounded-xl
                transition-all

                ${active
                  ? "bg-cyan-400/20 text-cyan-300 scale-110"
                  : "text-gray-400"}
              `}>

                <Icon size={22} />

              </div>

              <span className={`
                text-[11px]

                ${active
                  ? "text-cyan-300"
                  : "text-gray-500"}
              `}>

                {item.label}

              </span>

            </button>

          );
        })

      }

    </div>
  );
}