import { RECORDS_KEY } from "../constants/storage";

export function getRecords() {
  const records = localStorage.getItem(RECORDS_KEY);
  return records ? JSON.parse(records) : [];
}

export function saveRecord(record) {
  const records = getRecords();
  records.push(record);
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}
