import RankingBoard from "../components/RankingBoard";
import useRanking from "../hooks/useRanking";

export default function RankingPage() {
  const { records } = useRanking();

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-10">
      <h2 className="mb-6 text-xl font-bold">랭킹</h2>
      <RankingBoard records={records} />
    </main>
  );
}
