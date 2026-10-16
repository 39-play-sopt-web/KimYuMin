export default function Header({ activeMenu, level, selectGame, selectRanking, changeLevel, elapsed }) {
  return (
    <header className="grid grid-cols-3 items-center gap-4 border-b border-border p-4">
      <h1 className="font-bold">🔢 숫자 클릭 게임</h1>

      <nav aria-label="메인 메뉴" className="flex justify-center gap-2">
        <button
          type="button"
          onClick={selectGame}
          aria-pressed={activeMenu === "game"}
          className="rounded px-3 py-1 aria-pressed:bg-selected"
        >
          게임
        </button>
        <button
          type="button"
          onClick={selectRanking}
          aria-pressed={activeMenu === "ranking"}
          className="rounded px-3 py-1 aria-pressed:bg-selected"
        >
          랭킹
        </button>
      </nav>

      <div
        className={`flex items-center justify-end gap-4 ${activeMenu === "ranking" ? "invisible" : ""}`}
      >
        <select
          aria-label="레벨 선택"
          value={level}
          onChange={changeLevel}
          className="rounded border border-border p-1"
        >
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
        </select>
        <span className="rounded px-3 py-1 bg-selected">{(elapsed / 1000).toFixed(2)}초</span>
      </div>
    </header>
  );
}
