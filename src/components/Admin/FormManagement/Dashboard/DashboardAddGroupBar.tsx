import { FC, useRef } from "react";
import styled from "styled-components";
import breakpointConfig from "../../../../configs/breakpointConfig";
import useCreateGroup from "../../../../hooks/useCreateGroup";

const AddGroupWrapper = styled.div`
  display: none;
  align-items: center;
  width: 100%;
  height: 4rem;

  @media ${breakpointConfig.laptopS} {
    display: flex;
    margin: 1rem 0 1.5rem 0;
  }
`;

const AddGroupButton = styled.button`
  width: 12rem;
  height: 4rem;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  background-color: rgba(180, 188, 183, 1);
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;
`;

const AddGroupInput = styled.input`
  padding: 0.4rem 1rem;
  width: calc(100% - 12rem);
  height: 4rem;
  border: none;
  background-color: rgba(180, 188, 183, 0.5);
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #333;
  }
`;

const DashboardAddGroupBar: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const createNewGroupHandler = useCreateGroup();
  return (
    <AddGroupWrapper>
      <AddGroupInput
        type="text"
        placeholder="於此輸入群組名稱後，點擊右方新增"
        ref={inputRef}
      />
      <AddGroupButton
        type="button"
        onClick={() => {
          inputRef.current !== null &&
            createNewGroupHandler(inputRef.current.value);
        }}
      >
        新增群組
      </AddGroupButton>
    </AddGroupWrapper>
  );
};

export default DashboardAddGroupBar;
