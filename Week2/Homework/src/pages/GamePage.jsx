import GameBoard from "../components/GameBoard";
import useGame from "../hooks/useGame";

export default function GamePage() {
  const { numbers } = useGame();

  return (
    <main className="px-6 pt-[10vh] pb-6">
      <GameBoard numbers={numbers} />
    </main>
  );
}
