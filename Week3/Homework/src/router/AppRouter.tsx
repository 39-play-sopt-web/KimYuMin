import { Routes, Route } from "react-router";
import MovieListPage from "../pages/MovieListPage";
import MovieDetailPage from "../pages/MovieDetailPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MovieListPage />} />
      <Route path="/movies/:movieId" element={<MovieDetailPage />} />
    </Routes>
  );
}

export default AppRouter;
