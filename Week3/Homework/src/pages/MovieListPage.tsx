import * as S from "./MovieListPage.styles";
import { useEffect, useRef, useState } from "react";
import { getMovies } from "../api/movie";
import MovieCard from "../components/MovieCard";
import { ratings } from "../constants/ratings";
import type { Movie } from "../types/movie";

function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRating, setSelectedRating] = useState("전체");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const selectedRange = ratings.find((rating) => rating.label === selectedRating);
  const filteredMovies =
    selectedRating === "전체" || !selectedRange
      ? movies
      : movies.filter(
          (movie) =>
            movie.rating >= selectedRange.min &&
            (selectedRange.max === undefined || movie.rating < selectedRange.max),
        );

  useEffect(() => {
    let isActive = true;

    const loadMovies = async () => {
      setError("");
      setIsLoading(true);

      try {
        const data = await getMovies(page, selectedRating);
        if (!isActive) return;

        setMovies((prevMovies) => {
          if (page === 1) {
            return data.movies;
          }

          const newMovies = data.movies.filter(
            (movie) => !prevMovies.some((prevMovie) => prevMovie.id === movie.id),
          );

          return [...prevMovies, ...newMovies];
        });
        setTotalPages(data.totalPages);
      } catch {
        if (!isActive) return;
        setError("영화 목록을 불러오지 못했습니다.");
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      isActive = false;
    };
  }, [page, selectedRating]);

  useEffect(() => {
    if (isLoading || error || page >= totalPages) return;

    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setIsLoading(true);
          setPage((prevPage) => prevPage + 1);
        }
      },
      { rootMargin: "0px 0px 300px 0px" },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [isLoading, error, page, totalPages, selectedRating]);

  return (
    <S.Container>
      <h1>영화 목록</h1>
      <S.Filters>
        {ratings.map((rating) => (
          <S.FilterButton
            key={rating.label}
            type="button"
            isSelected={selectedRating === rating.label}
            onClick={() => {
              if (rating.label === selectedRating) return;

              setIsLoading(true);
              setMovies([]);
              setPage(1);
              setSelectedRating(rating.label);
            }}
          >
            {rating.label}
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

      <S.ScrollTarget ref={loadMoreRef} />
    </S.Container>
  );
}

export default MovieListPage;
