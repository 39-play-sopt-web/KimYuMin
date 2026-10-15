export default function Card({ number, selected = false, onClick }) {
  return (
    <button
      type="button"
      value={number}
      onClick={onClick}
      aria-pressed={selected}
      className="aspect-square w-full rounded border border-border bg-card aria-pressed:bg-selected"
    >
      {number}
    </button>
  );
}
