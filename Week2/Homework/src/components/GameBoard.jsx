import Card from "./Card";

export default function GameBoard({ numbers, nextNumber, clickedNumber, columns, onNumberClick }) {
  return (
    <div className={`mx-auto grid w-max gap-2 ${columns}`}>
      {numbers.map((number) => (
        <Card
          key={number}
          number={number}
          selected={number === clickedNumber}
          invisible={number < nextNumber}
          onClick={onNumberClick}
        />
      ))}
    </div>
  );
}
