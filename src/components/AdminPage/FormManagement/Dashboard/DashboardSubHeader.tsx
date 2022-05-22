import { useRouter } from "next/router";

import { FC, useContext } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../../configs/breakpointConfig";
import useDeleteGroup from "../../../../hooks/useDeleteGroup";
import useInitNewForm from "../../../../hooks/useInitNewForm";
import { adminContext } from "../../../../store/context/adminContext";
import sweetAlert from "../../../../utils/sweetAlert";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  margin: 1rem 0 0.5rem 0;
  padding-bottom: 2rem;
  width: 100%;
  height: 6rem;

  @media ${breakpointConfig.tabletS} {
    flex-direction: column;
    height: auto;
    align-items: start;
  }
`;

const ButtonContainer = styled.div`
  justify-content: end;
  width: 100%;
  height: 6rem;
  display: flex;
`;

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 1rem;
  width: 12rem;
  height: 4.6rem;
  background-color: #5b8f8b;
  cursor: pointer;
  color: #fff;
  font-family: inherit;
  font-size: 1.4rem;
  letter-spacing: 1px;
  line-height: 4.6rem;
  border-radius: 3px;

  &:hover {
    color: #555;
    background-color: #9dbcb9;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #ddd;

    &:hover {
      color: #fff;
      background-color: #ddd;
    }
  }

  @media ${breakpointConfig.tabletS} {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

const DeleteButtonWrapper = styled(ButtonWrapper)`
  margin-right: 1rem;
  background-color: #b4bcb7;
  color: #fff;
  transition: color 0.3s;
  &:hover {
    color: #c73030;
    background-color: #b4bcb7;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #ddd;
    &:hover {
      color: #fff;
      background-color: #ddd;
    }
  }
`;

const DashboardSubHeader: FC = () => {
  const router = useRouter();
  const { editingGroupId } = useContext(adminContext);
  const initHandler = useInitNewForm();
  const deleteGroupHandler = useDeleteGroup();
  const goAddNewFormHandler = (): void => {
    initHandler();
    router.push("/admin/new");
  };

  return (
    <HeaderWrapper>
      <ButtonContainer>
        <DeleteButtonWrapper
          onClick={() => deleteGroupHandler()}
          disabled={editingGroupId === "0"}
        >
          刪除群組
        </DeleteButtonWrapper>
        <ButtonWrapper
          onClick={() => {
            sweetAlert.loadingReminderAlert("正在準備問卷狀態...");
            goAddNewFormHandler();
          }}
          disabled={editingGroupId === "0"}
        >
          新增問卷
        </ButtonWrapper>
      </ButtonContainer>
    </HeaderWrapper>
  );
};

export default DashboardSubHeader;
