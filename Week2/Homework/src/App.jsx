import Header from "./components/Header";
import GamePage from "./pages/GamePage";
import RankingPage from "./pages/RankingPage";
import useMenu from "./hooks/useMenu";
import useGame from "./hooks/useGame";
import GameResultModal from "./components/GameResultModal";

export default function App() {
  const menu = useMenu();
  const game = useGame();

  return (
    <>
      <Header
        {...menu}
        level={game.level}
        changeLevel={game.changeLevel}
        elapsed={game.elapsed}
      />
      {menu.activeMenu === "game" ? <GamePage {...game} /> : <RankingPage />}
      {game.isFinished && (
        <GameResultModal level={game.level} elapsed={game.elapsed} onConfirm={game.closeResult} />
      )}
    </>
  );
}
