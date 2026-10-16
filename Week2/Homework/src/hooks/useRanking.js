import { useState } from "react";
import { getRecords } from "../utils/records";

export default function useRanking() {
  const [records] = useState(getRecords);

  return { records };
}
