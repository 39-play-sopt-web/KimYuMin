import styled from "@emotion/styled";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";

const movies: Movie[] = [
  {
    id: 1,
    title: "어느 여름날",
    posterUrl: null,
    releaseDate: "2026-07-15",
    overview: "안녕하세요. 테스트테스트테스트테스트. ",
  },
];

function MovieListPage() {
  return (
    <Container>
      <h1>영화 목록</h1>
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
