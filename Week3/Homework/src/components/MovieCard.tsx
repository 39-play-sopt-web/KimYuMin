import styled from "@emotion/styled";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card>
      <PosterArea>
        {movie.posterUrl && (
          <Poster src={movie.posterUrl} alt={`${movie.title} 포스터`} />
        )}
      </PosterArea>
      <Content>
        <Title>{movie.title}</Title>
        <ReleaseDate>
          개봉일 <time dateTime={movie.releaseDate}>{movie.releaseDate}</time>
        </ReleaseDate>
        <Overview>{movie.overview}</Overview>
      </Content>
    </Card>
  );
}

const Card = styled.article`
  height: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.card};

  &:hover {
    box-shadow: 0 4px 20px rgb(255 255 255 / 20%);
  }
`;

const PosterArea = styled.div`
  aspect-ratio: 2 / 3;
`;

const Poster = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
`;

const ReleaseDate = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`;

const Overview = styled.p`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.description};
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

export default MovieCard;
