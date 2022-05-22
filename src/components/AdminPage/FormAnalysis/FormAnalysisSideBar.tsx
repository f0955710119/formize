import { FC, useContext } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../configs/breakpointConfig";
import titleConfig from "../../../configs/titleConfig";
import adminActionType from "../../../store/actionType/adminActionType";
import { adminContext } from "../../../store/context/adminContext";
import Logo from "../../UI/Logo";
import SideBarButton from "../../UI/SideBarButton";

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 23rem;
  height: 100%;
  background-color: #ffc652c2;
  background-image: url("/images/group.svg");
  background-repeat: no-repeat;
  background-position: 50% 97%;
  background-size: 70%;

  @media ${breakpointConfig.tablet} {
    display: none;
  }
`;

const FormAnalysisSideBar: FC = () => {
  const context = useContext(adminContext);
  return (
    <SideBar>
      <Logo style={{ margin: "2rem 0 1rem 1rem", justifyContent: "start" }} />
      {titleConfig.ANALYSIS_FEATURE_TITLE.map((feature, i) => (
        <SideBarButton
          key={i}
          buttonText={feature}
          active={context.currentAnalysisPage === i}
          clickHandler={() => {
            context.setField(adminActionType.CURRENT_ANALYSIS_PAGE, i);
          }}
        />
      ))}
    </SideBar>
  );
};

export default FormAnalysisSideBar;
