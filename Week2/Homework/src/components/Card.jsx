export default function Card({ number, selected = false, invisible = false, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(number)}
      aria-pressed={selected}
      className={`aspect-square w-28 rounded border border-border bg-card aria-pressed:bg-selected ${invisible ? "invisible" : ""}`}
    >
      {number}
    </button>
  );
}
