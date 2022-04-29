import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import styled from "styled-components";
import adminActionType from "../../../store/actionType/adminActionType";
import { adminContext } from "../../../store/context/adminContext";
import Logo from "../../UI/Logo";
import SideBarButton from "../../UI/SideBarButton";

const SideBar = styled.div`
  display: flex;
  flex-direction: column;

  width: 23rem;
  height: 100%;
  background-color: rgba(180, 188, 183, 0.298);
  background-image: url("/images/side-bar-pic.svg");
  background-repeat: no-repeat;
  background-position: 0 100%;
`;

const analysisFeatureList = ["統計分析", "明細匯出", "訪問紀錄"];

const FormAnalysisSideBar: FC = () => {
  const context = useContext(adminContext);
  return (
    <SideBar>
      <Logo style={{ margin: "2rem 0 1rem 1rem", justifyContent: "start" }} />
      {analysisFeatureList.map((feature, i) => (
        <SideBarButton
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
