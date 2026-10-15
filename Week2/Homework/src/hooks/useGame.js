import { useEffect, useRef, useState } from "react";
import { BOARD_SIZE, TOTAL_NUMBERS } from "../constants/game";
import random from "../utils/random";
import useTimer from "./useTimer";

export default function useGame() {
  const { elapsed, startTimer, stopTimer } = useTimer();
  const [nextNumber, setNextNumber] = useState(1);
  const [clickedNumber, setClickedNumber] = useState(null);
  const clickTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(clickTimer.current);
  }, []);
  const [numbers, setNumbers] = useState(() => {
    const initialNumbers = [];

    for (let number = 1; number <= BOARD_SIZE * BOARD_SIZE; number++) {
      initialNumbers.push(number);
    }

    return random(initialNumbers);
  });

  const [remainingNumbers, setRemainingNumbers] = useState(() => {
    const laterNumbers = [];

    for (let number = BOARD_SIZE * BOARD_SIZE + 1; number <= TOTAL_NUMBERS; number++) {
      laterNumbers.push(number);
    }

    return random(laterNumbers);
  });

  function handleNumberClick(event) {
    const number = Number(event.currentTarget.value);

    if (number !== nextNumber || clickTimer.current !== null) return;

    if (number === 1) startTimer();
    if (number === TOTAL_NUMBERS) stopTimer();

    setClickedNumber(number);

    clickTimer.current = setTimeout(() => {
      if (remainingNumbers.length > 0) {
        setNumbers(numbers.map((item) => (
          item === number ? remainingNumbers[0] : item
        )));
        setRemainingNumbers(remainingNumbers.slice(1));
      }

      setNextNumber(number + 1);
      setClickedNumber(null);
      clickTimer.current = null;
    }, 150);
  }

  return { numbers, nextNumber, clickedNumber, elapsed, handleNumberClick };
}
