import { FC } from "react";
import styled from "styled-components";

import HeaderItem from "./HeaderItem";

const defaultTitles = ["設定資訊", "題目設計", "外觀樣式", "發布問卷"];

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 6rem;
`;

const StepHeader: FC = () => {
  return (
    <Header>
      {defaultTitles.map((title, i) => (
        <HeaderItem
          key={i}
          number={i + 1}
          title={title}
          isLastItem={i === defaultTitles.length - 1}
        />
      ))}
    </Header>
  );
};

export default StepHeader;
