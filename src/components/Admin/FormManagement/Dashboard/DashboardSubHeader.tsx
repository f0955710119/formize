import { FC, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import FilterComboBox from "./FilterComboBox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import DisplayButtonGroup from "./DisplayButtonGroup";

import useInitNewForm from "../../../../hooks/useInitNewForm";
import { adminContext } from "../../../../store/context/adminContext";
import breakpointConfig from "../../../../configs/breakpointConfig";

const defalutStatusOptions = ["公開", "待上線", "保護", "額滿", "關閉"];
const defalutDateOptions = ["最新創建", "最舊創建", "最新回覆", "最舊創建"];

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  margin: 1rem 0 0.5rem 0;
  padding-bottom: 2rem;
  width: 100%;
  height: 6rem;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 12rem);
  border-radius: 5px;

  transform: translateY(-1rem);
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
    /* background-color: #8e9aa2; */
    background-color: #646665;
  }

  /* @media ${breakpointConfig.tabletS} {
    width: 8rem;
  } ; */
`;

const ButtonText = styled.span`
  letter-spacing: 1px;
  font-size: 1.4rem;
  font-weight: bold;
`;

const DeleteButtonWrapper = styled(ButtonWrapper)`
  background-color: #eee;
  margin-right: 1rem;
  color: #777;
  &:hover {
    color: #f78a8a;
    background-color: #646665;
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
    width: 10rem;
  }
`;

const DashboardSubHeader: FC = () => {
  const router = useRouter();
  const initHandler = useInitNewForm();
  const context = useContext(adminContext);

  const goAddNewFormHandler = (): void => {
    initHandler();
    router.push("/admin/new");
  };

  return (
    <HeaderWrapper>
      <FilterWrapper>
        <FormControl>
          <CustomFormHelperText>選擇問卷狀態</CustomFormHelperText>
          <CustomSelect>
            {defalutStatusOptions.map((status, i) => (
              <option value={status} key={i}>
                {status}
              </option>
            ))}
          </CustomSelect>
        </FormControl>

        <FormControl>
          <CustomFormHelperText>選擇問卷日期</CustomFormHelperText>
          <CustomSelect>
            {defalutDateOptions.map((date, i) => (
              <option value={date} key={i}>
                {date}
              </option>
            ))}
          </CustomSelect>
        </FormControl>

        {/* <DisplayButtonGroup /> */}
      </FilterWrapper>
      {context.editingGroupId !== "0" && (
        <>
          <DeleteButtonWrapper
            onClick={() => {
              const test = async () => {
                const response = await fetch("/api/admin/group", {
                  method: "DELETE",
                  headers: {
                    Authorization: `Basic ${context.uid}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ groupId: context.editingGroupId }),
                });
                const data = await response.json();
                console.log(data);
              };
              test();
            }}
          >
            <DeleteButtonText>刪除群組</DeleteButtonText>
          </DeleteButtonWrapper>
          <ButtonWrapper onClick={goAddNewFormHandler}>
            <ButtonText>新增問卷</ButtonText>
          </ButtonWrapper>
        </>
      )}
    </HeaderWrapper>
  );
};

export default DashboardSubHeader;
