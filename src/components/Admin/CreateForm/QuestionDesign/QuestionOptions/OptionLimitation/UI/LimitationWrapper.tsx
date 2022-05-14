import styled from "styled-components";
import breakpointConfig from "../../../../../../../configs/breakpointConfig";

const LimitationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding-right: 1rem;
  width: 100%;

  @media ${breakpointConfig.laptopM} {
    height: 10vh;
  }
`;

export default LimitationWrapper;
