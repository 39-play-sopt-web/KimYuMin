export default function Card({ number, selected = false, invisible = false, onClick }) {
  return (
    <button
      type="button"
      value={number}
      onClick={onClick}
      aria-pressed={selected}
      className={`aspect-square w-full rounded border border-border bg-card aria-pressed:bg-selected ${invisible ? "invisible" : ""}`}
    >
      {number}
    </button>
  );
}
