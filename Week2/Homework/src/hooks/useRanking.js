import { useState } from "react";
import { getRecords, clearRecords } from "../utils/records";
import sortRecords from "../utils/sortRecords";

export default function useRanking() {
  const [records, setRecords] = useState(() => sortRecords(getRecords()));

  function resetRecords() {
    clearRecords();
    setRecords([]);
  }

  return { records, resetRecords };
}
