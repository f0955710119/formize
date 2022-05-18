import { FC, useRef } from "react";
import styled from "styled-components";
import breakpointConfig from "../../../../configs/breakpointConfig";
import useCreateGroup from "../../../../hooks/useCreateGroup";
import useWindow from "../../../../hooks/useWindow";

const AddGroupWrapper = styled.div`
  display: flex;
  margin: 1rem 0 1.5rem 0;
  align-items: center;
  width: 32.2%;
  height: 4rem;
  @media ${breakpointConfig.laptopS} {
    width: 100%;
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

  &:hover {
    color: #fff;
    background-color: #555;
  }
`;

const AddGroupInput = styled.input`
  padding: 0.4rem 1rem;
  width: calc(100% - 12rem);
  height: 4rem;
  border: none;
  background-color: #dddddd5c;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;

  font-size: 1.4rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #333;
  }
`;

const DashboardAddGroupBar: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const windowObj = useWindow();
  const hasWindow = windowObj !== undefined && windowObj !== null;
  const addGroupPlaceholderText =
    hasWindow && windowObj?.innerWidth < 425
      ? "於此輸入群組名稱後"
      : "於此輸入群組名稱後，點擊右方新增";

  const createNewGroupHandler = useCreateGroup();
  return (
    <AddGroupWrapper>
      <AddGroupInput
        type="text"
        placeholder={addGroupPlaceholderText}
        ref={inputRef}
      />
      <AddGroupButton
        type="button"
        onClick={() => {
          if (inputRef.current === null) return;
          createNewGroupHandler(inputRef.current.value);
          inputRef.current.value = "";
        }}
      >
        新增群組
      </AddGroupButton>
    </AddGroupWrapper>
  );
};

export default DashboardAddGroupBar;
