import styled from "styled-components";
import breakpointConfig from "../../../../../../../configs/breakpointConfig";
import scrollBar from "../../../../../../UI/scrollBar";

const LimitationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding-right: 1rem;
  width: 100%;
  /* height: 25vh;
  overflow-y: scroll; */
  /* height: 15vh; */

  /* overflow-y: auto;
  ${scrollBar} */

  @media ${breakpointConfig.laptopM} {
    height: 10vh;
  }
`;

export default LimitationWrapper;
