import GameBoard from "../components/GameBoard";

export default function GamePage({ numbers, nextNumber, clickedNumber, columns, totalNumbers, handleNumberClick }) {
  const displayNumber = Math.min(nextNumber, totalNumbers);

  return (
    <main className="px-6 pt-[10vh] pb-6">
      <p className="mb-6 flex items-baseline justify-center gap-2">
        <span className="text-sm text-secondary">다음 숫자</span>
        <strong className="text-3xl">{displayNumber}</strong>
        <span className="text-sm text-secondary">
          ({nextNumber - 1} / {totalNumbers})
        </span>
      </p>
      <GameBoard
        numbers={numbers}
        nextNumber={nextNumber}
        clickedNumber={clickedNumber}
        columns={columns}
        onNumberClick={handleNumberClick}
      />
    </main>
  );
}
