import GameBoard from "../components/GameBoard";
import useGame from "../hooks/useGame";
import { TOTAL_NUMBERS } from "../constants/game";

export default function GamePage() {
  const { numbers, nextNumber, handleNumberClick } = useGame();

  return (
    <main className="px-6 pt-[10vh] pb-6">
      <p className="mb-6 flex items-baseline justify-center gap-2">
        <span className="text-sm text-secondary">다음 숫자</span>
        <strong className="text-3xl">{nextNumber}</strong>
        <span className="text-sm text-secondary">
          ({nextNumber} / {TOTAL_NUMBERS})
        </span>
      </p>
      <GameBoard
        numbers={numbers}
        nextNumber={nextNumber}
        onNumberClick={handleNumberClick}
      />
    </main>
  );
}
