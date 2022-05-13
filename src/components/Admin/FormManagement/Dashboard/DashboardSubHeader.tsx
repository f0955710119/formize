import { FC, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import FormHelperText from "@mui/material/FormHelperText";
import Swal from "sweetalert2";

import useInitNewForm from "../../../../hooks/useInitNewForm";
import { adminContext } from "../../../../store/context/adminContext";
import breakpointConfig from "../../../../configs/breakpointConfig";
import useInitAdminInfo from "../../../../hooks/useInitAdminInfo";
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

const CustomFormHelperText = styled(FormHelperText)`
  font-family: inherit;
  transform: translateX(-1rem);
`;

const CustomSelect = styled.select`
  height: 3rem;
  width: 12rem;
  margin-right: 1rem;
  font-family: inherit;
  padding: 0.4rem;
  color: #777;
  border-radius: 3px;

  @media ${breakpointConfig.tabletS} {
    width: 18rem;
  }

  @media ${breakpointConfig.mobileL} {
    max-width: 12rem;
  }
`;

const DashboardSubHeader: FC = () => {
  const router = useRouter();
  const initHandler = useInitNewForm();
  const initAdminHandler = useInitAdminInfo();
  const context = useContext(adminContext);

  const goAddNewFormHandler = (): void => {
    initHandler();
    router.push("/admin/new");
  };

  const deleteExistingGroup = async () => {
    const willDeleteGroup =
      context.groups.length > 0
        ? context.groups.find((group) => group.id === context.editingGroupId)
        : undefined;
    const deleteGroupTitle = willDeleteGroup ? willDeleteGroup.name : "";
    const deleteGroupCallback = async () => {
      try {
        sweetAlert.loadingReminderAlert("正在刪除群組...");
        const response = await fetch("/api/admin/group", {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${context.uid}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ groupId: context.editingGroupId }),
        });
        const data = await response.json();
        await initAdminHandler(context.uid, true);
        sweetAlert.loadedReminderAlert("刪除成功!");
        setTimeout(() => {
          sweetAlert.closeAlert();
        }, 1500);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    const reesponse = await sweetAlert.textInputAlert(
      {
        title: `刪除群組\n${
          deleteGroupTitle !== "" ? `「${deleteGroupTitle}」` : ""
        }`,
        text: "刪除群組將遺失其內部的所有問卷，\n會失去大量資料且不可復原，確定要刪除嗎?",
        cancelButtonText: "取消",
        confirmButtonText: "刪除",
        inputLabel: `輸入群組名稱: ${deleteGroupTitle}`,
      },
      deleteGroupTitle
    );

    if (reesponse.value !== deleteGroupTitle) return;
    await deleteGroupCallback();
  };

  return (
    <HeaderWrapper>
      <FilterWrapper></FilterWrapper>
      {context.editingGroupId !== "0" && (
        <>
          <DeleteButtonWrapper onClick={() => deleteExistingGroup()}>
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
