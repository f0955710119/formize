import { FC, useContext } from "react";
import styled from "styled-components";
import adminActionType from "../../../../store/actionType/adminActionType";
import { adminContext } from "../../../../store/context/adminContext";

const EditingGroupTagWrapper = styled.div`
  width: 34.2%;
  height: 3.2rem;
  border-radius: 3px;
`;

const EditingGroupTag = styled.select`
  width: 100%;
  height: 100%;
  border: 1px solid #c8c8c8;
  padding: 0.4rem;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

interface ChangeEditingGroupSelect {
  className?: string;
}

const ChangeEditingGroupSelect: FC<ChangeEditingGroupSelect> = ({
  className,
}) => {
  const context = useContext(adminContext);
  const groupList = [
    { name: "總表 (切換群組來新增問卷)", id: "0" },
    ...context.groups,
  ];

  return (
    <EditingGroupTagWrapper className={className}>
      <EditingGroupTag
        value={context.editingGroupId}
        onChange={(event) => {
          const value = event.target.value as string;
          context.setField(adminActionType.EDITING_GROUP, value);
        }}
      >
        {groupList.map((group) => (
          <option key={group.id} value={group.id} id={group.id}>
            {group.name}
          </option>
        ))}
      </EditingGroupTag>
    </EditingGroupTagWrapper>
  );
};

export default ChangeEditingGroupSelect;
