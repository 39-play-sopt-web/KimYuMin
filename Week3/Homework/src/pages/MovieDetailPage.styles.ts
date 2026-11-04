import styled from "@emotion/styled";
import { Link } from "react-router";

export const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: none;
`;

export const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
`;

export const MovieHeader = styled.div<{ backgroundPath: string | null }>`
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

export const Poster = styled.img`
  width: 200px;
  flex-shrink: 0;
  border-radius: 12px;
`;

export const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MovieInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.colors.description};
  font-size: 14px;
`;

export const Rating = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.background};
`;

export const Release = styled.span`
  padding: 6px 15px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.description};
`;

export const GenreList = styled.div`
  display: flex;
  gap: 8px;
  border-radius: 12px;
`;

export const Genre = styled.span`
  padding: 6px 15px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.genre};
  color: ${({ theme }) => theme.colors.muted};
`;

export const Overview = styled.section`
  margin-top: 100px;

  p {
    margin-top: 30px;
    color: ${({ theme }) => theme.colors.description};
    font-size: 15px;
    line-height: 2;
  }
`;

/* 기본 정보 */
export const BasicInfo = styled.section`
  margin-top: 55px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 30px;
`;

export const InfoCard = styled.div`
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
