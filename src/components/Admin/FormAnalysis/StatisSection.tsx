import { FC, useContext } from "react";
import styled from "styled-components";
import { adminContext } from "../../../store/context/adminContext";
import NonTextTableContent from "./StatisTable/NonTextTableContent";
import Table from "./StatisTable/Table";
import TextTableContent from "./StatisTable/TextTableContent";

const StatisSectionContainer = styled.section`
  padding: 2rem 2.5rem 0 3.5rem;
  width: calc(100% - 23rem);
  height: 100%;
`;

const StatisSectionHeading = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
  font-size: 2.6rem;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    bottom: 0.4rem;
    left: 1rem;
    width: 100%;
    height: 6px;
    background-color: #b4bcb747;
    border-radius: 3px;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: -0.6rem;
    left: -0.4rem;
    width: 100%;
    height: 6px;
    background-color: #b4bcb747;
    border-radius: 3px;
  }
`;

const StatisSection: FC = () => {
  const context = useContext(adminContext);
  const formData = context.forms.find(
    (form) => form.id === context.editingFormId
  );

  return (
    <StatisSectionContainer>
      <StatisSectionHeading>問卷標題: {formData?.title}</StatisSectionHeading>
      <Table title="ddddddd">
        <TextTableContent
          count={{
            好好: 2,
            你好: 5,
            嗨: 1,
            好好好: 2,
            嗨你好: 5,
            U嗨: 1,
            好好好12: 2,
            嗨121你好: 5,
            U2445嗨: 1,
          }}
        />
      </Table>
      <br />
      <Table title="1248484fg">
        <NonTextTableContent
          headerNames={["選項", "次數"]}
          count={[
            { option: "選項1", times: 0 },
            { option: "選項2", times: 1 },
            { option: "選項3", times: 0 },
            { option: "選項1", times: 0 },
            { option: "選項1", times: 0 },
            { option: "選項1", times: 0 },
            { option: "選項1", times: 0 },
            { option: "選項1", times: 0 },
            { option: "選項1", times: 0 },
          ]}
        />
      </Table>
    </StatisSectionContainer>
  );
};

export default StatisSection;
