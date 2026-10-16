export default function RankingBoard({ records }) {
  if (records.length === 0) {
    return (
      <p className="text-center text-secondary">
        아직 기록이 없어요. 게임을 플레이 해주세요!
      </p>
    );
  }

  return (
    <div className="rounded-lg">
      <table className="w-full bg-card text-left text-sm [&_th]:p-3 [&_td]:p-3">
        <thead className="bg-selected">
          <tr>
            <th scope="col">순위</th>
            <th scope="col">레벨</th>
            <th scope="col">플레이 시간</th>
            <th scope="col">기록 시각</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record.date}>
              <td>{index + 1}</td>
              <td>Level {record.level}</td>
              <td>{(record.time / 1000).toFixed(2)}초</td>
              <td>{new Date(record.date).toLocaleString("ko-KR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
