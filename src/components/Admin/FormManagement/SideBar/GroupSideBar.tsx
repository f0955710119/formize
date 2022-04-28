import { FC, useContext } from "react";
import styled from "styled-components";

import GroupSelectButton from "./GroupSelectButton";
import Logo from "../../../UI/Logo";
import { adminContext } from "../../../../store/context/adminContext";
import adminActionType from "../../../../store/actionType/adminActionType";

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 23rem;
  height: 100%;
  /* background-color: #b4bcb7; */
  background-color: rgba(180, 188, 183, 0.298);
  background-image: url("/images/side-bar-pic.svg");
  background-repeat: no-repeat;
  background-position: 0 100%;
`;
const GroupHeading = styled.span`
  display: block;
  margin-bottom: 1rem;
  padding-left: 1rem;
  width: 100%;
  font-size: 1.6rem;
`;

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.2rem;

  margin-bottom: 2rem;
  cursor: pointer;
  background-color: transparent;
`;

const ButtonText = styled.span`
  display: inline-block;
  padding: 0.4rem 4rem;
  border-radius: 3px;
  font-size: 1.4rem;
  background-color: #fff;
`;

const Add = styled.span`
  font-size: 1.8rem;
  margin-right: 0.5rem;
`;

const GroupSideBar: FC = () => {
  const context = useContext(adminContext);
  const switchEditingGroupHandler = (id: string) => {
    context.setField(adminActionType.EDITING_GROUP, id);
  };

  const createNewGroup = async (newGroupName: string) => {
    const response = await fetch("/api/admin/group", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newGroupName }),
    });
  };

  return (
    <BarContainer>
      <Logo style={{ margin: "2rem 0 1rem 1rem", justifyContent: "start" }} />
      <ButtonWrapper>
        <ButtonText>
          <Add>+</Add> 新增群組
        </ButtonText>
      </ButtonWrapper>
      <GroupHeading>群組分類</GroupHeading>
      {context.groups.length > 0 &&
        context.groups.map((group) => (
          <GroupSelectButton
            buttonText={group.name}
            key={group.id}
            active={context.editingGroupId === group.id}
            clickHandler={() => {
              switchEditingGroupHandler(group.id);
            }}
          />
        ))}
    </BarContainer>
  );
};

export default GroupSideBar;
