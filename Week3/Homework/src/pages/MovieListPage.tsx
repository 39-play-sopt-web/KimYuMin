import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getMovies } from "../api/movie";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";

const ratings = ["전체", "9점 이상", "8~9점", "7~8점", "6~7점", "6점 미만"];

function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRating, setSelectedRating] = useState("전체");

  const filteredMovies =
    selectedRating === "전체"
      ? movies
      : movies.filter((movie) => {
          switch (selectedRating) {
            case "9점 이상":
              return movie.rating >= 9;
            case "8~9점":
              return movie.rating >= 8 && movie.rating < 9;
            case "7~8점":
              return movie.rating >= 7 && movie.rating < 8;
            case "6~7점":
              return movie.rating >= 6 && movie.rating < 7;
            case "6점 미만":
              return movie.rating < 6;
            default:
              return true;
          }
        });

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch {
        setError("영화 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <Container>
      <h1>영화 목록</h1>
      <Filters>
        {ratings.map((rating) => (
          <FilterButton
            key={rating}
            type="button"
            isSelected={selectedRating === rating}
            onClick={() => setSelectedRating(rating)}
          >
            {rating}
          </FilterButton>
        ))}
      </Filters>

      {isLoading && <p>영화를 불러오는 중입니다.</p>}
      {error && <p>{error}</p>}

      <MovieList>
        {filteredMovies.map((movie) => (
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

const Filters = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`;

const FilterButton = styled.button<{ isSelected: boolean }>`
  padding: 8px 16px;
  border: 0;
  border-radius: 20px;
  cursor: pointer;

  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.muted : theme.colors.card};

  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.background : theme.colors.text};
`;
export default MovieListPage;
