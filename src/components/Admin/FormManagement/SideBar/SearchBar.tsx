import { FC } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 3rem;
  padding: 2rem 0.8rem;
  width: 100%;
  height: 4rem;
  border-radius: 3px;
  border: 0.8px solid #777;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  border: none;
  width: 82%;
  color: #777;
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.3s;

  &::placeholder {
    color: #aaa;
    transition: color 0.1s;
  }

  &:focus {
    border-bottom: 1px solid #aaa;
    opacity: 1;
    visibility: visible;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const SearchBar: FC = () => {
  return (
    <SearchWrapper>
      <SearchInput
        id="search"
        autoComplete="off"
        placeholder="搜尋群組名稱..."
        required
      />
      <SearchIcon
        sx={{
          width: "2.4rem",
          height: "2.4rem",
          fill: "#aaa",
          cursor: "pointer",
          ml: "0.5rem",
        }}
      />
    </SearchWrapper>
  );
};

export default SearchBar;
