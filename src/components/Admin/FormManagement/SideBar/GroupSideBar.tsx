import { FC } from "react";
import styled from "styled-components";

import SearchBar from "./SearchBar";
import GroupSelectButton from "./GroupSelectButton";

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  width: 30rem;
  height: 100%;
  border-right: 1px solid #c8c8c8;
`;
const GroupHeading = styled.span`
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 1.6rem;
`;

const defaultButtonText = ["我的群組", "Personal"];

const GroupSideBar: FC = () => {
  return (
    <BarWrapper>
      <SearchBar />
      <GroupHeading>群組分類</GroupHeading>
      {defaultButtonText.map((text) => (
        <GroupSelectButton buttonText={text}></GroupSelectButton>
      ))}
    </BarWrapper>
  );
};

export default GroupSideBar;
