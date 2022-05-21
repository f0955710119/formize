import FormControlLabel from "@mui/material/FormControlLabel";
import styled from "styled-components";

export const CustomIcon = styled.span`
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => `${props.theme.title}50`};
  border-radius: 50%;

  background-image: radial-gradient(#fff, #fff 28%, transparent 32%);

  input:hover ~ & {
    background-color: ${(props) => props.theme.title};
  }

  input:checked ~ & {
    opacity: 1;
  }
`;

export const CustomCheckedIcon = styled(CustomIcon)`
  background-color: ${(props) => props.theme.title};

  &::before {
    content: "";
    display: block;
    width: 2rem;
    height: 2rem;

    background-image: radial-gradient(#fff, #fff 28%, transparent 32%);
  }

  input:hover ~ & {
    background-color: "#30404d";
  }
`;

interface CustomFormLabel {
  active: string;
}
export const CustomFormLabel = styled(FormControlLabel)<CustomFormLabel>`
  margin-bottom: 1rem;
  padding: 0.8rem 0;
  width: 97.96%;
  font-family: inherit;
  border: ${(props) =>
    props.active === "true"
      ? `2px solid ${props.theme.title}`
      : `2px solid ${props.theme.title}4d;`};
  border-radius: 5px;
  transition: border 0.2s;
  color: ${(props) => (props.active === "true" ? props.theme.title : `${props.theme.title}cc`)};
  & .MuiTypography-root {
    font-size: 1.8rem;
    font-family: inherit;
    margin-left: 1rem;
    transform: translateY(0.1rem);
  }
`;
