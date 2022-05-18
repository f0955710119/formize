import styled from "styled-components";

const Field = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }

  &:not(:first-child) {
    margin-top: 0.6rem;
  }

  & .MuiSelect-root {
    height: 3.8rem;
    padding: 1.8rem 0;
    border-radius: 3px;
  }

  & .MuiSelect-select {
    font-size: 1.5rem;
    line-height: 1.4375em;
  }

  & .MuiMenuItem-root {
    font-size: 1.5rem;
  }
`;

export default Field;
