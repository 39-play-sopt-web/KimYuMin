import Header from "./components/Header";
import GamePage from "./pages/GamePage";
import useHeader from "./hooks/useHeader";
import useGame from "./hooks/useGame";
import GameResultModal from "./components/GameResultModal";

export default function App() {
  const header = useHeader();
  const game = useGame();

  return (
    <>
      <Header
        {...header}
        level={game.level}
        changeLevel={game.changeLevel}
        elapsed={game.elapsed}
      />
      {header.activeMenu === "game" && <GamePage {...game} />}
      {game.isFinished && (
        <GameResultModal level={game.level} elapsed={game.elapsed} onConfirm={game.closeResult} />
      )}
    </>
  );
}
