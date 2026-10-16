import { useState } from "react";
import { getRecords } from "../utils/records";
import sortRecords from "../utils/sortRecords";

export default function useRanking() {
  const [records] = useState(() => sortRecords(getRecords()));

  return { records };
}
