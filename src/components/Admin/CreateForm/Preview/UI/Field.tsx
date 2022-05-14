import styled from "styled-components";
import { StyledComponentTheme } from "../../../../../store/theme/theme";
interface FieldProps {
  isActive?: boolean;
  theme: StyledComponentTheme;
}

const Field = styled.div<FieldProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4rem;
  border-radius: 3px;
  border: ${(props: FieldProps) =>
    props.isActive ? `3px solid ${props.theme.title};` : "1px solid #c8c8c8;"};

  ${(props) => (props.isActive ? "" : "cursor: pointer;")}

  transition: border 0.3s;
  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

export default Field;
