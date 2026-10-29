import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovieDetail } from "../api/movie";
import type { MovieDetail } from "../types/movie";
import styled from "@emotion/styled";

function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovie = async () => {
      if (!movieId) return;

      setIsLoading(true);
      setMovie(null);
      setError("");

      try {
        const data = await getMovieDetail(movieId);
        setMovie(data);
      } catch {
        setError("영화 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMovie();
  }, [movieId]);

  return (
    <Container>
      {isLoading && <p>영화 정보를 불러오는 중입니다.</p>}
      {error && <p>{error}</p>}

      {movie && (
        <MovieHeader>
          {movie.poster_path && (
            <Poster
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} 포스터`}
            />
          )}

          <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>
        </MovieHeader>
      )}
    </Container>
  );
}

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
`;

const MovieHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
`;

const Poster = styled.img`
  width: 200px;
  flex-shrink: 0;
  border-radius: 12px;
`;

export default MovieDetailPage;
