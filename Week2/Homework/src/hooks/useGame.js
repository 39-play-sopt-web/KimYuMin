import { useEffect, useRef, useState } from "react";
import { LEVELS } from "../constants/game";
import createNumbers from "../utils/createNumbers";
import useTimer from "./useTimer";

export default function useGame() {
  const { elapsed, startTimer, stopTimer, resetTimer } = useTimer();
  const [level, setLevel] = useState("1");
  const { columns, totalNumbers } = LEVELS[level];
  const [nextNumber, setNextNumber] = useState(1);
  const [clickedNumber, setClickedNumber] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const clickTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(clickTimer.current);
  }, []);
  const [numbers, setNumbers] = useState(() =>
    createNumbers(1, totalNumbers / 2),
  );

  const [remainingNumbers, setRemainingNumbers] = useState(() =>
    createNumbers(totalNumbers / 2 + 1, totalNumbers),
  );

  function resetGame(nextLevel) {
    const nextSize = LEVELS[nextLevel].size;
    const cardCount = nextSize * nextSize;

    clearTimeout(clickTimer.current);
    clickTimer.current = null;
    resetTimer();
    setLevel(nextLevel);
    setNextNumber(1);
    setClickedNumber(null);
    setIsFinished(false);
    setNumbers(createNumbers(1, cardCount));
    setRemainingNumbers(
      createNumbers(cardCount + 1, LEVELS[nextLevel].totalNumbers),
    );
  }

  function changeLevel(event) {
    resetGame(event.target.value);
  }

  function closeResult() {
    resetGame(level);
  }

  function handleNumberClick(event) {
    const number = Number(event.currentTarget.value);

    if (number !== nextNumber || clickTimer.current !== null || isFinished) return;

    if (number === 1) startTimer();
    if (number === totalNumbers) stopTimer();

    setClickedNumber(number);

    clickTimer.current = setTimeout(() => {
      if (remainingNumbers.length > 0) {
        setNumbers(
          numbers.map((item) => (item === number ? remainingNumbers[0] : item)),
        );
        setRemainingNumbers(remainingNumbers.slice(1));
      }

      setNextNumber(number + 1);
      setClickedNumber(null);
      clickTimer.current = null;
      if (number === totalNumbers) setIsFinished(true);
    }, 150);
  }

  return {
    numbers,
    nextNumber,
    clickedNumber,
    elapsed,
    level,
    columns,
    totalNumbers,
    isFinished,
    closeResult,
    changeLevel,
    handleNumberClick,
  };
}
