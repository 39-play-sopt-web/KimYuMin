import styled from "@emotion/styled";
import { Link } from "react-router";

export const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
`;

export const MovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;

  li {
    min-width: 0;
  }
`;

export const Filters = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`;

export const FilterButton = styled.button<{ isSelected: boolean }>`
  padding: 8px 16px;
  border: 0;
  border-radius: 20px;
  cursor: pointer;

  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.muted : theme.colors.card};

  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.background : theme.colors.text};
`;

export const MovieLink = styled(Link)`
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
`;

export const ScrollTarget = styled.div`
  height: 1px;
`;
