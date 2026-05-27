import { useState, useEffect, useRef } from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "./context/AuthContext";

import {
  useStreak,
} from "./context/StreakContext";


import {

  requestNotificationPermission,
  showNotification,

} from "./utils/NotificationUtils";


import BackgroundGlow from "./components/BackgroundGlow";
import ParticleBackground from "./components/ParticleBackground";
import CursorGlow from "./components/CursorGlow";
import StatusBar from "./components/StatusBar";
import FocusCard from "./components/FocusCard";
import FocusTimer from "./components/FocusTimer";
import TaskInput from "./components/TaskInput";
import Sidebar from "./components/Sidebar";
import InsightsPanel from "./components/InsightsPanel";
import CommandPalette from "./components/CommandPalette";
import ScheduleCalendar from "./components/ScheduleCalendar";
import ProductivityChart from "./components/ProductivityChart";
import TaskBoard from "./components/TaskBoard";
import GlobalMusicPlayer from "./components/GlobalMusicPlayer";
import IntroScreen from "./components/IntroScreen";
import MobileNavbar from "./components/MobileNavbar";
import FloatingAddButton from "./components/FloatingAddButton";
import MobileBottomNav from "./components/MobileBottomNav";
import StreakCard from "./components/StreakCard";
import API from "./services/api";
export default function App() {

  const navigate =
    useNavigate();

  const { logout } =
    useAuth();


  /* ✅ STREAK SYSTEM FIX */
  const {
    completeFocusSession,
  } = useStreak();

  const [mood, setMood] =
    useState("focus");

  const [theme, setTheme] =
    useState("night");

  const [paletteOpen, setPaletteOpen] =
    useState(false);

  const [activePage, setActivePage] =
    useState("focus");

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const [completedCount, setCompletedCount] =
    useState(0);

  const [showIntro, setShowIntro] =
    useState(true);

  /* ================= TIMER ================= */

  const [secondsLeft, setSecondsLeft] =
    useState(0);

  const [isRunning, setIsRunning] =
    useState(true);

  const intervalRef =
    useRef(null);

  /* ================= TASKS ================= */

  const [tasks, setTasks] = useState(() => {

    const savedTasks =
      localStorage.getItem(
        "flowstate-tasks"
      );

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];

  });

  useEffect(() => {

    localStorage.setItem(

      "flowstate-tasks",

      JSON.stringify(tasks)

    );

  }, [tasks]);

  useEffect(() => {

    requestNotificationPermission();

  }, []);


  /* ================= FETCH TASKS ================= */

  /*useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks =
    async () => {

      try {

        const res =
          await API.get("/tasks");

        console.log(
          "FETCHED TASKS:",
          res.data
        );

        setTasks(res.data);

      } catch (error) {

        console.log(error);

      }
    };*/
  const currentTask = tasks[0];


  const totalTasks =
    tasks.length + completedCount;

  const focusScore =
    totalTasks === 0
      ? 0
      : Math.round(
        (completedCount / totalTasks) * 100
      );

  /* ================= TIMER INIT ================= */

  const [activeTaskId, setActiveTaskId] =
    useState(null);

  useEffect(() => {

    if (!currentTask?.time)
      return;

    if (
      activeTaskId === currentTask.id
    ) {
      return;
    }

    const [value, unit] =
      currentTask.time.split(" ");

    const number =
      parseInt(value);

    let total = 0;

    if (unit.includes("minute"))
      total = number * 60;

    else if (unit.includes("hour"))
      total = number * 3600;

    else
      total = number;

    setSecondsLeft(total);

    setIsRunning(true);

    setActiveTaskId(currentTask.id);

  }, [currentTask, activeTaskId]);

  /* ================= TIMER ENGINE ================= */

  useEffect(() => {

    if (!isRunning)
      return;

    intervalRef.current =
      setInterval(() => {

        setSecondsLeft((prev) => {

          if (prev <= 1) {

            clearInterval(
              intervalRef.current
            );


            showNotification(

              "Focus Session Complete ⏳",

              "Time to level up your productivity."

            );



            return 0;

          }

          return prev - 1;

        });

      }, 1000);

    return () =>
      clearInterval(
        intervalRef.current
      );

  }, [isRunning]);

  /* ================= COMPLETE TASK ================= */
  /*const completeTask =
    async () => {

      if (!currentTask) return;

      try {

        await API.put(
          `/tasks/${currentTask._id}/complete`
        );

        completeFocusSession();

        await fetchTasks();

        setCompletedCount(
          (prev) => prev + 1
        );

        setSecondsLeft(0);

      } catch (error) {

        console.log(error);

      }
    };*/

  const completeTask = () => {
    showNotification("Task Completed 🚀", "Another mission conquered in FlowState.");
    setTasks((prev) =>
      prev.slice(1)
    );

    setCompletedCount((prev) =>
      prev + 1
    );

    setSecondsLeft(0);

  };




  /* ================= ADD TASK ================= */

  /*const addTask = async (taskData) => {

    if (!taskData.title.trim())
      return;

    try {

      const res =
        await API.post(
          "/tasks",
          {
            title: taskData.title,
            energy: taskData.energy,
            time: taskData.time,
            deadline: taskData.deadline,
          }
        );

      setTasks((prev) => [
        res.data,
        ...prev,
      ]);

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      );

    }
  };*/

  const addTask = (taskData) => {

    if (!taskData.title.trim())
      return;

    const newTask = {

      id: Date.now(),

      title: taskData.title,

      energy: taskData.energy,

      time: taskData.time,

      deadline: taskData.deadline,

      type: "Focus",

    };

    setTasks((prev) => [
      ...prev,
      newTask,
    ]);

  };






  return (

    <div
      className={`
        min-h-screen
        text-white
        overflow-hidden
        relative

        flex
        items-center
        justify-center

        px-3
        sm:px-4
        md:px-6

        pt-4
        md:pt-6

        pb-[120px]
        md:pb-[420px]

        transition-all
        duration-500

        ${theme === "night"
          ? "bg-[#070A12]"
          : "bg-[#0b0f1a]"
        }
      `}
    >

      {/* ================= INTRO ================= */}

      {
        showIntro && (

          <div className="fixed inset-0 z-[9999]">

            <IntroScreen
              onFinish={() =>
                setShowIntro(false)
              }
            />

          </div>

        )
      }

      {/* ================= BACKGROUND ================= */}

      <CursorGlow />

      <BackgroundGlow mood={mood} />

      <ParticleBackground />

      {/* ================= MUSIC ================= */}

      <div className="fixed bottom-6 left-0 right-0 z-[80]">

        <GlobalMusicPlayer />

      </div>

      {/* ================= COMMAND ================= */}

      <CommandPalette
        tasks={tasks}
        open={paletteOpen}
        setOpen={setPaletteOpen}
      />

      {/* ================= LAYOUT ================= */}

      <div className="
        relative
        z-20
        w-full
        max-w-[1600px]

        flex
        flex-col
        lg:flex-row

        gap-4
        lg:gap-6
      ">

        {/* ================= SIDEBAR ================= */}

        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          focusScore={focusScore}
        />

        {/* ================= MAIN ================= */}

        <div className="
          flex-1
          flex
          justify-center
          w-full
        ">

          <div className="
            w-full
            max-w-2xl
            px-2
            sm:px-4
          ">

            <StatusBar />

            {/* ================= FOCUS ================= */}

            {
              activePage === "focus" && (

                <>

                  {
                    currentTask ? (

                      <>

                        <FocusCard
                          task={currentTask}
                          nextTask={completeTask}
                        />

                        <FocusTimer
                          task={currentTask}
                          secondsLeft={secondsLeft}
                          setSecondsLeft={setSecondsLeft}
                          isRunning={isRunning}
                          setIsRunning={setIsRunning}
                        />

                      </>

                    ) : (

                      <div className="
                        bg-white/5
                        border border-white/10
                        rounded-3xl
                        p-10
                        text-center
                        backdrop-blur-xl
                      ">

                        <h2 className="
                          text-2xl
                          font-semibold
                          mb-2
                        ">

                          All tasks completed ✨

                        </h2>

                      </div>

                    )
                  }

                  <div className="relative z-30">

                    <TaskInput
                      addTask={addTask}
                    />

                  </div>

                </>

              )
            }

            {/* ================= DASHBOARD ================= */}

            {
              activePage === "dashboard" && (

                <div className="space-y-6">

                  {/* MOOD */}

                  <div className="
                    bg-white/5
                    p-4
                    rounded-2xl
                    border border-white/10
                  ">

                    <p className="
                      text-sm
                      text-gray-400
                      mb-2
                    ">

                      What is your mood today?

                    </p>

                    <select
                      value={mood}
                      onChange={(e) =>
                        setMood(
                          e.target.value
                        )
                      }

                      className="
                        bg-black/40
                        p-3
                        rounded-xl
                        w-full
                      "
                    >

                      <option value="focus">
                        Focus
                      </option>

                      <option value="creative">
                        Creative
                      </option>

                      <option value="calm">
                        Calm
                      </option>

                      <option value="overload">
                        Overload
                      </option>

                    </select>

                  </div>

                  {/* ✅ STREAK CARD */}

                  <StreakCard />

                  <ScheduleCalendar
                    selectedDate={selectedDate}
                    setSelectedDate={
                      setSelectedDate
                    }
                  />

                </div>

              )
            }

            {/* ================= TASKS ================= */}

            {
              activePage === "tasks" && (

                <TaskBoard
                  tasks={tasks}
                  setTasks={setTasks}
                />

              )
            }

            {/* ================= ANALYTICS ================= */}

            {
              activePage === "analytics" && (

                <ProductivityChart
                  focusScore={focusScore}
                />

              )
            }

            {/* ================= SETTINGS ================= */}

            {
              activePage === "settings" && (

                <div className="
                  bg-white/5
                  p-6
                  rounded-2xl
                  border border-white/10
                ">

                  <h2 className="
                    text-xl
                    mb-4
                  ">

                    Settings

                  </h2>

                  <div className="
                    flex
                    gap-3
                    flex-wrap
                  ">

                    <button
                      onClick={() =>
                        setTheme("night")
                      }

                      className="
                        px-4
                        py-2
                        rounded-xl
                        bg-blue-500/20
                        hover:bg-blue-500/30
                        transition
                      "
                    >

                      Night

                    </button>

                    <button
                      onClick={() =>
                        setTheme("dark")
                      }

                      className="
                        px-4
                        py-2
                        rounded-xl
                        bg-gray-500/20
                        hover:bg-gray-500/30
                        transition
                      "
                    >

                      Dark

                    </button>

                  </div>

                  {/* LOGOUT */}

                  <button
                    onClick={() => {

                      logout();

                      navigate("/login");

                    }}

                    className="
                      mt-6
                      px-5
                      py-3
                      rounded-2xl
                      bg-red-500/20
                      border
                      border-red-500/20
                      hover:bg-red-500/30
                      transition
                      text-white
                    "
                  >

                    Logout

                  </button>
                  
<button

  onClick={() => {

    showNotification(

      "FlowState Test 🔥",

      "Notifications are working."

    );

  }}

  className="
    fixed
    top-5
    right-5
    z-[9999]
    px-4
    py-2
    rounded-xl
    bg-cyan-500
    text-black
    font-bold
  "
>

  Test Notification

</button>


                </div>

              )
            }


          </div>

        </div>

        {/* ================= INSIGHTS ================= */}

        <InsightsPanel
          tasks={tasks}
        />

      </div>

      {/* ================= MOBILE ================= */}

      <MobileNavbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <FloatingAddButton
        addTask={addTask}
      />

      <MobileBottomNav
        activePage={activePage}
        setActivePage={setActivePage}
      />

    </div>
  );
}