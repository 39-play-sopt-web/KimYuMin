import { useEffect, useRef, useState } from "react";

export default function useTimer() {
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef(null);
  const interval = useRef(null);

  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);

  function startTimer() {
    clearInterval(interval.current);
    startedAt.current = performance.now();
    setElapsed(0);

    interval.current = setInterval(() => {
      setElapsed(performance.now() - startedAt.current);
    }, 10);
  }

  function stopTimer() {
    clearInterval(interval.current);
    interval.current = null;

    if (startedAt.current !== null) {
      setElapsed(performance.now() - startedAt.current);
    }
  }

  return { elapsed, startTimer, stopTimer };
}
