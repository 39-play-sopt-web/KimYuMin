const RECORDS_KEY = "number-game-records";

export function getRecords() {
  const records = localStorage.getItem(RECORDS_KEY);
  return records ? JSON.parse(records) : [];
}

export function saveRecord(record) {
  const records = getRecords();
  records.push(record);
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}

export function clearRecords() {
  localStorage.removeItem(RECORDS_KEY);
}
