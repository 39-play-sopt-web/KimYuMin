import Card from "./Card";

export default function GameBoard({ numbers }) {
  return (
    <div className="mx-auto grid w-full max-w-80 grid-cols-3 gap-2">
      {numbers.map((number) => (
        <Card key={number} number={number} />
      ))}
    </div>
  );
}
