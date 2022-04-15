import styled from "styled-components";

const Field = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export default Field;
