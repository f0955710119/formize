import { FC, useContext, useRef } from "react";
import styled from "styled-components";

import SideBarButton from "../../../UI/SideBarButton";

import Logo from "../../../UI/Logo";
import { adminContext } from "../../../../store/context/adminContext";
import adminActionType from "../../../../store/actionType/adminActionType";

import breakpointConfig from "../../../../configs/breakpointConfig";
import useCreateGroup from "../../../../hooks/useCreateGroup";

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 23rem;
  height: 100%;
  background-color: #ffc652c2;
  background-image: url("/images/group.svg");
  background-repeat: no-repeat;
  background-position: 50% 97%;
  background-size: 70%;

  @media ${breakpointConfig.laptopS} {
    display: none;
  } ;
`;

const GroupHeading = styled.span`
  display: block;
  margin-bottom: 1rem;
  padding-left: 2rem;
  width: 100%;
  font-size: 1.6rem;
`;

const GroupSideBar: FC = () => {
  const context = useContext(adminContext);
  const newGropuInputRef = useRef<HTMLInputElement | null>(null);
  const switchEditingGroupHandler = (id: string) => {
    context.setField(adminActionType.EDITING_GROUP, id);
  };
  const createNewGroupHandler = useCreateGroup();

  return (
    <BarContainer>
      <Logo style={{ margin: "2rem 0 2rem 2rem", justifyContent: "start" }} />
      <GroupHeading>群組分類</GroupHeading>
      <SideBarButton
        buttonText="總表 (切換群組來新增問卷)"
        active={context.editingGroupId === "0"}
        clickHandler={() => {
          switchEditingGroupHandler("0");
        }}
      />
      {context.groups.length > 0 &&
        context.groups.map((group) => (
          <SideBarButton
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
