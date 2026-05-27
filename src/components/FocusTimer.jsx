/*import { useEffect, useState } from "react";

export default function FocusTimer({
    task,
}) {

    const parseTime = () => {

        if (!task?.time)
            return 0;

        const [value, unit] =
            task.time.split(" ");

        const number =
            parseInt(value);

        if (unit.includes("second"))
            return number;

        if (unit.includes("minute"))
            return number * 60;

        if (unit.includes("hour"))
            return number * 3600;

        return 0;
    };

    const [secondsLeft, setSecondsLeft] =
        useState(parseTime());

    useEffect(() => {

        setSecondsLeft(parseTime());

    }, [task]);

    useEffect(() => {

        if (secondsLeft <= 0) {

            let count = 0;

            const beepInterval = setInterval(() => {

                const audio = new Audio(
                    "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
                );

                audio.play();

                count++;

                // Stop after ~10 seconds
                if (count >= 10) {
                    clearInterval(beepInterval);
                }

            }, 1000);

            return;
        }

        const interval = setInterval(() => {

            setSecondsLeft((prev) => prev - 1);

        }, 1000);

        return () =>
            clearInterval(interval);

    }, [secondsLeft]);

    const hours =
        Math.floor(secondsLeft / 3600);

    const minutes =
        Math.floor(
            (secondsLeft % 3600) / 60
        );

    const seconds =
        secondsLeft % 60;

    return (
        <div className="mt-6 bg-black/20 border border-white/10 rounded-2xl p-5 text-center">

            <p className="text-sm text-gray-400 mb-2">
                Focus Timer
            </p>

            <h2 className="text-5xl font-bold tracking-wider">

                {String(hours).padStart(2, "0")}:
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}

            </h2>

        </div>
    );
}*/
import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import DeepFocusMode from "./DeepFocusMode";

export default function FocusTimer({ task }) {

  /* =========================
     CONVERT TASK TIME
  ========================= */
  const totalSeconds = useMemo(() => {

    if (!task?.time) return 0;

    const [value, unit] = task.time.split(" ");

    const number = parseInt(value);

    if (unit.includes("second")) return number;

    if (unit.includes("minute")) return number * 60;

    if (unit.includes("hour")) return number * 3600;

    return 0;

  }, [task]);

  /* =========================
     TIMER STATE
  ========================= */
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  const [isRunning, setIsRunning] = useState(true);

  const [alarmPlayed, setAlarmPlayed] = useState(false);

  const [deepMode, setDeepMode] = useState(false);

  /* IMPORTANT:
     STORE INTERVAL GLOBALLY
     SO TIMER NEVER RESTARTS
  */
  const intervalRef = useRef(null);

  /* =========================
     RESET ONLY WHEN TASK CHANGES
  ========================= */
  useEffect(() => {

    setSecondsLeft(totalSeconds);

    setIsRunning(true);

    setAlarmPlayed(false);

  }, [task?.id, totalSeconds]);

  /* =========================
     ESC CLOSES DEEP MODE
  ========================= */
  useEffect(() => {

    const handleKey = (e) => {

      if (e.key === "Escape") {

        setDeepMode(false);

      }

    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);

  }, []);

  /* =========================
     MAIN TIMER ENGINE
     (PERSISTENT)
  ========================= */
  useEffect(() => {

    if (!isRunning) {

      clearInterval(intervalRef.current);

      return;

    }

    intervalRef.current = setInterval(() => {

      setSecondsLeft((prev) => {

        if (prev <= 1) {

          clearInterval(intervalRef.current);

          return 0;

        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(intervalRef.current);

  }, [isRunning]);

  /* =========================
     ALARM
  ========================= */
  useEffect(() => {

    if (secondsLeft > 0) return;

    if (alarmPlayed) return;

    setAlarmPlayed(true);

    let count = 0;

    const beepInterval = setInterval(() => {

      const audio = new Audio(
        "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
      );

      audio.volume = 1;

      audio.play();

      count++;

      if (count >= 10) {

        clearInterval(beepInterval);

      }

    }, 1000);

    return () => clearInterval(beepInterval);

  }, [secondsLeft, alarmPlayed]);

  /* =========================
     FORMAT TIME
  ========================= */
  const hours = Math.floor(secondsLeft / 3600);

  const minutes = Math.floor(
    (secondsLeft % 3600) / 60
  );

  const seconds = secondsLeft % 60;

  /* =========================
     PROGRESS
  ========================= */
  const progress =
    totalSeconds === 0
      ? 0
      : (secondsLeft / totalSeconds) * 100;

  /* =========================
     SAFE CLOSE
  ========================= */
  const handleCloseDeepMode = () => {

    setDeepMode(false);

  };

  return (
    <>
      <div className="mt-6 bg-black/20 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-sm text-gray-400">
              Focus Timer
            </p>

            <h2 className="text-lg font-medium mt-1">
              {task?.title}
            </h2>

          </div>

        </div>

        {/* PROGRESS BAR */}
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-8">

          <div
            style={{
              width: `${progress}%`,
            }}
            className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-1000 rounded-full"
          />

        </div>

        {/* TIMER */}
        <div className="text-center">

          <h1 className="text-6xl font-bold tracking-widest mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">

            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}

          </h1>

          {/* CONTROLS */}
          <div className="flex justify-center gap-4">

            {/* PLAY / PAUSE */}
            <button
              onClick={() =>
                setIsRunning(!isRunning)
              }
              className="w-14 h-14 rounded-2xl bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 shadow-lg shadow-blue-500/30"
            >

              {isRunning ? (
                <Pause size={22} />
              ) : (
                <Play size={22} />
              )}

            </button>

            {/* RESET */}
            <button
              onClick={() => {

                setSecondsLeft(totalSeconds);

                setIsRunning(false);

              }}
              className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
            >

              <RotateCcw size={22} />

            </button>

          </div>

          {/* DEEP FOCUS */}
          <button
            onClick={() => setDeepMode(true)}
            className="mt-6 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-cyan-400/40"
          >

            Enter Deep Focus

          </button>

        </div>

      </div>

      {/* =========================
          DEEP MODE
      ========================= */}
      {deepMode && (
        <DeepFocusMode
          task={task}
          secondsLeft={secondsLeft}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          closeMode={handleCloseDeepMode}
        />
      )}
    </>
  );
}