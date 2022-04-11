import { FC } from "react";
import styled from "styled-components";

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 3rem;
  padding: 2rem 0.8rem;
  width: 100%;
  height: 4rem;
  border-radius: 3px;
  border: 0.8px solid #777;
`;

const SearchLabel = styled.label`
  position: absolute;
  width: 82%;
  top: 1rem;
  left: 1rem;
  color: #777;
  z-index: 1;
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
`;

const SearchInput = styled.input`
  border: none;
  width: 82%;
  height: 100%;

  transition: opacity 0.3s, visibility 0.3s, border-bottom 0.3s;

  &:focus {
    outline: none;
    border-bottom: 1px solid #777;
    opacity: 1;
    visibility: visible;
  }

  &:focus ~ ${SearchLabel},&:not(:focus):valid ~ ${SearchLabel} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-1rem);
  }
`;

const SearchBar: FC = () => {
  return (
    <SearchWrapper>
      <SearchInput id="search" required />
      <SearchLabel htmlFor="search">搜尋</SearchLabel>
    </SearchWrapper>
  );
};

export default SearchBar;
