import RankingBoard from "../components/RankingBoard";
import useRanking from "../hooks/useRanking";

export default function RankingPage() {
  const { records, resetRecords } = useRanking();

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">🏆 랭킹</h2>
        <button
          type="button"
          onClick={resetRecords}
          className="rounded border border-reset-border text-reset-border px-3 py-1"
        >
          초기화
        </button>
      </div>
      <RankingBoard records={records} />
    </main>
  );
}
