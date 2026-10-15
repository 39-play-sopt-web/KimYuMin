import Header from "./components/Header";
import GamePage from "./pages/GamePage";
import useHeader from "./hooks/useHeader";

export default function App() {
  const header = useHeader();

  return (
    <>
      <Header {...header} />
      {header.activeMenu === "game" && <GamePage />}
    </>
  );
}
