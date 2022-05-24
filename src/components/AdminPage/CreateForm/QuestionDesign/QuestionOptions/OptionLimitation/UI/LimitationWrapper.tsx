import styled from "styled-components";

import breakpointConfig from "../../../../../../../configs/breakpointConfig";

const LimitationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding-right: 1rem;
  width: 100%;

  & .MuiFormControl-root {
    border-radius: 3px;
    height: 100%;
  }

  & .MuiInputBase-input {
    height: 100%;
  }
`;

export default LimitationWrapper;
