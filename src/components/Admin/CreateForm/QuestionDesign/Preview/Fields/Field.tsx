import styled from "styled-components";

const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

export default Field;
