import { useState } from "react";
import { BOARD_SIZE } from "../constants/game";
import random from "../utils/random";

export default function useGame() {
  const [numbers] = useState(() => {
    const initialNumbers = [];

    for (let number = 1; number <= BOARD_SIZE * BOARD_SIZE; number++) {
      initialNumbers.push(number);
    }

    return random(initialNumbers);
  });

  return { numbers };
}
