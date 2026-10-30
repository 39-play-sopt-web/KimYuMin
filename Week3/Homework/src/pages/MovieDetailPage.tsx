import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovieDetail } from "../api/movie";
import type { MovieDetail } from "../types/movie";
import * as S from "./MovieDetailPage.styles";

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
    <S.Container>
      <S.BackLink to="/">⇠ 목록으로 돌아가기</S.BackLink>
      {isLoading && <p>영화 정보를 불러오는 중입니다.</p>}
      {error && <p>{error}</p>}

      {movie && (
        <>
          <S.MovieHeader backgroundPath={movie.backdrop_path}>
            {movie.poster_path && (
              <S.Poster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} 포스터`}
              />
            )}

            <S.MovieInfo>
              <h1>{movie.title}</h1>

              <S.MovieInfoRow>
                <S.Rating>★ {movie.vote_average.toFixed(1)}</S.Rating>
                <span>{movie.release_date}</span>
                {movie.runtime !== null && <span>{movie.runtime}분</span>}
                <span>투표 {movie.vote_count}명</span>
                <S.Release>{movie.status}</S.Release>
              </S.MovieInfoRow>

              <S.GenreList>
                {movie.genres.map((genre) => (
                  <S.Genre key={genre.id}>{genre.name}</S.Genre>
                ))}
              </S.GenreList>
            </S.MovieInfo>
          </S.MovieHeader>

          <S.Overview>
            <h2>줄거리</h2>
            <p>{movie.overview}</p>
          </S.Overview>

          <S.BasicInfo>
            <h2>기본 정보</h2>

            <S.InfoGrid>
              <S.InfoCard>
                <span>원제</span>
                <p>{movie.original_title}</p>
              </S.InfoCard>

              <S.InfoCard>
                <span>원어</span>
                <p>{movie.original_language}</p>
              </S.InfoCard>

              <S.InfoCard>
                <span>제작 국가</span>
                <p>
                  {movie.production_countries
                    .map((country) => country.name)
                    .join(", ")}
                </p>
              </S.InfoCard>

              <S.InfoCard>
                <span>사용 언어</span>
                <p>
                  {movie.spoken_languages
                    .map((language) => language.name)
                    .join(", ")}
                </p>
              </S.InfoCard>

              <S.InfoCard>
                <span>예산</span>
                <p>${movie.budget.toLocaleString("en-US")}</p>
              </S.InfoCard>

              <S.InfoCard>
                <span>수익</span>
                <p>${movie.revenue.toLocaleString("en-US")}</p>
              </S.InfoCard>
            </S.InfoGrid>
          </S.BasicInfo>
        </>
      )}
    </S.Container>
  );
}

export default MovieDetailPage;
