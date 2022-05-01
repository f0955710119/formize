import { FC, useContext, useRef } from "react";
import styled from "styled-components";

import SideBarButton from "../../../UI/SideBarButton";

import Logo from "../../../UI/Logo";
import { adminContext } from "../../../../store/context/adminContext";
import adminActionType from "../../../../store/actionType/adminActionType";
import type { Group } from "../../../../store/context/adminContext";
const BarContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 23rem;
  height: 100%;
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
  flex-direction: column;
  margin-bottom: 2rem;
  width: 100%;
  border: 3px;

  cursor: pointer;
  background-color: rgba(180, 188, 183, 0.5); ;
`;

const ButtonText = styled.span`
  display: inline-block;
  width: 100%;
  text-align: left;
  padding: 0.8rem 0 0.8rem 1rem;
  font-size: 1.4rem;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom: 1px solid #c8c8c8;
  background-color: rgba(180, 188, 183, 0.5); ;
`;

const Add = styled.span`
  transform: translateY(0.5rem);
  font-size: 1.8rem;
  margin-right: 0.5rem;
`;

const AddInput = styled.input`
  background-color: rgba(180, 188, 183, 0.5);
  border: none;
  padding: 0.8rem;
  width: 100%;
  height: 4rem;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #eeecec;
  }
`;

const GroupSideBar: FC = () => {
  const context = useContext(adminContext);
  const newGropuInputRef = useRef<any>();
  const switchEditingGroupHandler = (id: string) => {
    context.setField(adminActionType.EDITING_GROUP, id);
  };

  const createNewGroup = async (newGroupName: string) => {
    if (!newGroupName || newGroupName.trim().length === 0) {
      alert("不可以新增沒有名稱的群組!");
      return;
    }
    const response = await fetch("/api/admin/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: context.uid,
      },
      body: JSON.stringify({ newGroupName }),
    });

    if (!response.ok) throw new Error("新增群組失敗，請聯繫IT部門");

    const data = await response.json();
    const { groupId } = data.data;

    if (!groupId) throw new Error("查無此群組而新增失敗，請聯繫IT部門");

    const newGroupObj: Group = {
      id: groupId,
      name: newGroupName,
      forms: [],
      userId: context.uid,
    };

    const updateGropus = [...context.groups, newGroupObj];
    context.setField(adminActionType.GROUPS, updateGropus);
  };

  return (
    <BarContainer>
      <Logo style={{ margin: "2rem 0 2rem 1rem", justifyContent: "start" }} />
      <ButtonWrapper>
        <ButtonText
          onClick={() => {
            createNewGroup(newGropuInputRef.current.value);
          }}
        >
          <Add>+</Add> 新增群組
        </ButtonText>
        <AddInput
          type="text"
          placeholder="於此輸入群組名稱後，點擊上方新增"
          ref={newGropuInputRef}
        />
      </ButtonWrapper>
      <GroupHeading>群組分類</GroupHeading>
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
