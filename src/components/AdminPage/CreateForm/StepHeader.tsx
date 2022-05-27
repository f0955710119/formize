import { FC } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../configs/breakpointConfig";
import titleConfig from "../../../configs/titleConfig";
import HeaderItem from "./HeaderItem";

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 6rem;
  transform: translateX(-1.9rem);

  @media ${breakpointConfig.tabletS} {
    display: none;
  }
`;

const defaultTitles = titleConfig.CREATE_FORM_STEP_TITLE;

const StepHeader: FC = () => {
  return (
    <Header>
      {defaultTitles.map((title, i) => (
        <HeaderItem
          key={title}
          number={i + 1}
          title={title}
          isLastItem={i === defaultTitles.length - 1}
        />
      ))}
    </Header>
  );
};

export default StepHeader;
