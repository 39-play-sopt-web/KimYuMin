import { LEVELS } from "../constants/game.js";

const RECORDS_KEY = "number-game-records";

export function getRecords() {
  try {
    const storedRecords = localStorage.getItem(RECORDS_KEY);
    if (!storedRecords) return [];

    const records = JSON.parse(storedRecords);
    if (!Array.isArray(records)) return [];

    return records.filter(isValidRecord);
  } catch {
    return [];
  }
}

function isValidRecord(record) {
  if (!record || typeof record !== "object") return false;

  return (
    Number.isInteger(record.level) &&
    Object.hasOwn(LEVELS, record.level) &&
    Number.isFinite(record.time) &&
    record.time >= 0 &&
    typeof record.date === "string" &&
    Number.isFinite(Date.parse(record.date))
  );
}

export function saveRecord(record) {
  const records = getRecords();
  records.push(record);
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}

export function clearRecords() {
  localStorage.removeItem(RECORDS_KEY);
}
