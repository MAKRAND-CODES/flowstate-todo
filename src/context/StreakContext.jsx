import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const StreakContext =
  createContext();

export const StreakProvider = ({
  children,
}) => {

  const [streak, setStreak] =
    useState(0);

  const [xp, setXp] =
    useState(0);

  const [level, setLevel] =
    useState(1);

  /* ================= LOAD ================= */

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "flowstate-streak"
        )
      );

    if (saved) {

      setStreak(saved.streak || 0);

      setXp(saved.xp || 0);

      setLevel(saved.level || 1);

    }

  }, []);

  /* ================= SAVE ================= */

  useEffect(() => {

    localStorage.setItem(
      "flowstate-streak",

      JSON.stringify({
        streak,
        xp,
        level,
      })
    );

  }, [streak, xp, level]);

  /* ================= COMPLETE SESSION ================= */

  const completeFocusSession =
    () => {

      let newXp = xp + 20;

      let newLevel = level;

      if (newXp >= 100) {

        newXp =
          newXp - 100;

        newLevel =
          level + 1;

      }

      setXp(newXp);

      setLevel(newLevel);

      setStreak((prev) =>
        prev + 1
      );

    };

  return (

    <StreakContext.Provider
      value={{

        streak,

        xp,

        level,

        completeFocusSession,

      }}
    >

      {children}

    </StreakContext.Provider>

  );
};

export const useStreak =
  () => useContext(
    StreakContext
  );