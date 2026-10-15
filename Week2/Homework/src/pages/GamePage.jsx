import GameBoard from "../components/GameBoard";
import useGame from "../hooks/useGame";
import { TOTAL_NUMBERS } from "../constants/game";

export default function GamePage() {
  const { numbers, nextNumber, clickedNumber, handleNumberClick } = useGame();
  const displayNumber = Math.min(nextNumber, TOTAL_NUMBERS);

  return (
    <main className="px-6 pt-[10vh] pb-6">
      <p className="mb-6 flex items-baseline justify-center gap-2">
        <span className="text-sm text-secondary">다음 숫자</span>
        <strong className="text-3xl">{displayNumber}</strong>
        <span className="text-sm text-secondary">
          ({displayNumber} / {TOTAL_NUMBERS})
        </span>
      </p>
      <GameBoard
        numbers={numbers}
        nextNumber={nextNumber}
        clickedNumber={clickedNumber}
        onNumberClick={handleNumberClick}
      />
    </main>
  );
}
