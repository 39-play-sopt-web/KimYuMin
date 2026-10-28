export default function sortRecords(records) {
  return [...records].sort((a, b) => {
    if (a.level !== b.level) return b.level - a.level;

    return a.time - b.time;
  });
}
