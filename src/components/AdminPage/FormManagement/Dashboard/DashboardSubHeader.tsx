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

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 12rem);
  border-radius: 5px;

  transform: translateY(-1rem);
  @media ${breakpointConfig.tabletS} {
    width: 100%;
  }
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

  border-radius: 3px;

  &:hover {
    color: #555;
    background-color: #9dbcb9;
  }

  @media ${breakpointConfig.tabletS} {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

const ButtonText = styled.span`
  letter-spacing: 1px;
  font-size: 1.4rem;
  font-weight: bold;
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
`;

const DeleteButtonText = styled(ButtonText)`
  font-weight: normal;
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
      <FilterWrapper></FilterWrapper>
      {editingGroupId !== "0" && (
        <>
          <DeleteButtonWrapper onClick={() => deleteGroupHandler()}>
            <DeleteButtonText>刪除群組</DeleteButtonText>
          </DeleteButtonWrapper>
          <ButtonWrapper
            onClick={() => {
              sweetAlert.loadingReminderAlert("正在準備問卷狀態...");
              goAddNewFormHandler();
            }}
          >
            <ButtonText>新增問卷</ButtonText>
          </ButtonWrapper>
        </>
      )}
    </HeaderWrapper>
  );
};

export default DashboardSubHeader;
