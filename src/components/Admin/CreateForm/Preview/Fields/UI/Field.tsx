import styled from "styled-components";

interface FieldProps {
  isActive?: boolean;
}

const Field = styled.div<FieldProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4rem;
  border-radius: 3px;
  border: ${(props: FieldProps) =>
    props.isActive ? "3px solid #f90;" : "1px solid #c8c8c8;"};
  transition: border 0.3s;
  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

export default Field;
