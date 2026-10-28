import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getMovies } from "../api/movie";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";

function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadMovies = async () => {
      try {
        const data = await getMovies(controller.signal);

        if (!controller.signal.aborted) {
          setMovies(data);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("영화 목록을 불러오지 못했습니다.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadMovies();

    return () => controller.abort();
  }, []);

  return (
    <Container>
      <h1>영화 목록</h1>
      {isLoading && <p>영화를 불러오는 중입니다.</p>}
      {error && <p>{error}</p>}
      <MovieList>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </MovieList>
    </Container>
  );
}

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
`;

const MovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
`;

export default MovieListPage;
