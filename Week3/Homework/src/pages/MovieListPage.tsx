import * as S from "./MovieListPage.styles";
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
    <S.Container>
      <h1>영화 목록</h1>
      <S.Filters>
        {ratings.map((rating) => (
          <S.FilterButton
            key={rating}
            type="button"
            isSelected={selectedRating === rating}
            onClick={() => setSelectedRating(rating)}
          >
            {rating}
          </S.FilterButton>
        ))}
      </S.Filters>

      {isLoading && <p>영화를 불러오는 중입니다.</p>}
      {error && <p>{error}</p>}

      <S.MovieList>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            <S.MovieLink to={`/movies/${movie.id}`}>
              <MovieCard movie={movie} />
            </S.MovieLink>
          </li>
        ))}
      </S.MovieList>
    </S.Container>
  );
}

export default MovieListPage;
