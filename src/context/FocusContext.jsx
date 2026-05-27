import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FocusContext =
  createContext();

export const FocusProvider = ({
  children,
}) => {

  const [secondsLeft, setSecondsLeft] =
    useState(0);

  const [isRunning, setIsRunning] =
    useState(false);

  const [currentTaskId, setCurrentTaskId] =
    useState(null);

  /* TIMER ENGINE */
  useEffect(() => {

    if (!isRunning) return;

    const interval =
      setInterval(() => {

        setSecondsLeft((prev) => {

          if (prev <= 1) {

            clearInterval(interval);

            return 0;

          }

          return prev - 1;

        });

      }, 1000);

    return () =>
      clearInterval(interval);

  }, [isRunning]);

  return (
    <FocusContext.Provider
      value={{
        secondsLeft,
        setSecondsLeft,

        isRunning,
        setIsRunning,

        currentTaskId,
        setCurrentTaskId,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus =
  () => useContext(FocusContext);