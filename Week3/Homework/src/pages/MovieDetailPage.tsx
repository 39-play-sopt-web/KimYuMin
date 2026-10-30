import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
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
      <BackLink to="/">⇠ 목록으로 돌아가기</BackLink>
      {isLoading && <p>영화 정보를 불러오는 중입니다.</p>}
      {error && <p>{error}</p>}

      {movie && (
        <>
          <MovieHeader backgroundPath={movie.backdrop_path}>
            {movie.poster_path && (
              <Poster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} 포스터`}
              />
            )}

            <MovieInfo>
              <h1>{movie.title}</h1>

              <MovieInfoRow>
                <Rating>★ {movie.vote_average.toFixed(1)}</Rating>
                <span>{movie.release_date}</span>
                {movie.runtime !== null && <span>{movie.runtime}분</span>}
                <span>투표 {movie.vote_count}명</span>
                <Release>{movie.status}</Release>
              </MovieInfoRow>

              <GenreList>
                {movie.genres.map((genre) => (
                  <Genre key={genre.id}>{genre.name}</Genre>
                ))}
              </GenreList>
            </MovieInfo>
          </MovieHeader>

          <Overview>
            <h2>줄거리</h2>
            <p>{movie.overview}</p>
          </Overview>

          <BasicInfo>
            <h2>기본 정보</h2>

            <InfoGrid>
              <InfoCard>
                <span>원제</span>
                <p>{movie.original_title}</p>
              </InfoCard>

              <InfoCard>
                <span>원어</span>
                <p>{movie.original_language}</p>
              </InfoCard>

              <InfoCard>
                <span>제작 국가</span>
                <p>
                  {movie.production_countries
                    .map((country) => country.name)
                    .join(", ")}
                </p>
              </InfoCard>

              <InfoCard>
                <span>사용 언어</span>
                <p>
                  {movie.spoken_languages
                    .map((language) => language.name)
                    .join(", ")}
                </p>
              </InfoCard>

              <InfoCard>
                <span>예산</span>
                <p>${movie.budget.toLocaleString("en-US")}</p>
              </InfoCard>

              <InfoCard>
                <span>수익</span>
                <p>${movie.revenue.toLocaleString("en-US")}</p>
              </InfoCard>
            </InfoGrid>
          </BasicInfo>
        </>
      )}
    </Container>
  );
}

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: none;
`;

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
`;

const MovieHeader = styled.div<{ backgroundPath: string | null }>`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 32px;
  border-radius: 16px;

  background-image: ${({ theme, backgroundPath }) =>
    backgroundPath
      ? `linear-gradient(
            ${theme.colors.overlay_top},
            ${theme.colors.overlay_bottom}
        ),
        url("https://image.tmdb.org/t/p/w1280${backgroundPath}")`
      : "none"};

  background-size: cover;
  background-position: center;
`;

const Poster = styled.img`
  width: 200px;
  flex-shrink: 0;
  border-radius: 12px;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MovieInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.colors.description};
  font-size: 14px;
`;

const Rating = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.background};
`;

const Release = styled.span`
  padding: 6px 15px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.description};
`;

const GenreList = styled.div`
  display: flex;
  gap: 8px;
  border-radius: 12px;
`;

const Genre = styled.span`
  padding: 6px 15px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.genre};
  color: ${({ theme }) => theme.colors.muted};
`;

const Overview = styled.section`
  margin-top: 100px;

  p {
    margin-top: 30px;
    color: ${({ theme }) => theme.colors.description};
    font-size: 15px;
    line-height: 2;
  }
`;

/* 기본 정보 */
const BasicInfo = styled.section`
  margin-top: 55px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 30px;
`;

const InfoCard = styled.div`
  padding: 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.card};

  span {
    color: ${({ theme }) => theme.colors.description};
    font-size: 12px;
  }

  p {
    margin-top: 8px;
  }
`;

export default MovieDetailPage;
