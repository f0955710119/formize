import { FC, useContext } from "react";
import styled from "styled-components";
import { adminContext } from "../../../../store/context/adminContext";
import adminActionType from "../../../../store/actionType/adminActionType";
import Logo from "../../../UI/Logo";
import breakpointConfig from "../../../../configs/breakpointConfig";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  width: 100%;
  height: 5rem;
`;

const EditingGroupTagWrapper = styled.div`
  width: 18rem;
  height: 3.2rem;
  border-radius: 3px;
`;

const EditingGroupTag = styled.select`
  width: 100%;
  height: 100%;
  border: 1px solid #c8c8c8;
  padding: 0.4rem;
  border-radius: 3px;
  &:focus {
    outline: none;
  }
`;

const DashboardMainHeader: FC = () => {
  const context = useContext(adminContext);
  const groupList = [{ name: "總表", id: "0" }, ...context.groups];

  const logoMedia = `
  display: "none";

  @media ${breakpointConfig.laptopS}{
    display:inline-block;
    margin-right: 1rem;
  }`;

  const logoTextMedia = `
  display: none;
  @media ${breakpointConfig.laptopS}{
    display:block;
    font-size: 2.8rem
  }`;

  return (
    <HeaderWrapper>
      <Logo mediaSetting={logoMedia} textMediaSetting={logoTextMedia} />
      <EditingGroupTagWrapper>
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
    </HeaderWrapper>
  );
};

export default DashboardMainHeader;
