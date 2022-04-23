import { FC } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import FilterComboBox from "./FilterComboBox";
import DisplayButtonGroup from "./DisplayButtonGroup";

import useInitNewForm from "../../../../hooks/useInitNewForm";

const defalutStatusOptions = ["公開", "待上線", "保護", "額滿", "關閉"];
const defalutDateOptions = ["最新創建", "最舊創建", "最新回覆", "最舊創建"];

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding-bottom: 2rem;
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid #e8e8e8;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 12rem);
`;

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 1rem;
  width: 12rem;
  height: 4.6rem;
  background-color: #f3d28b;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #f90;
  }
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
`;

const DashboardHeader: FC = () => {
  const router = useRouter();
  const initHandler = useInitNewForm();

  const goAddNewFormHandler = (): void => {
    initHandler();
    router.push("/admin/new");
  };

  return (
    <HeaderWrapper>
      <FilterWrapper>
        <FilterComboBox
          fieldLabel="問卷狀態"
          options={defalutStatusOptions}
          id="form-status"
          style={{
            width: "15rem",
            radius: 0,
            mr: "2.4rem",
          }}
        />
        <FilterComboBox
          fieldLabel="日期"
          options={defalutDateOptions}
          id="form-date"
          style={{ width: "15rem", radius: 0, mr: "2.4rem" }}
        />
        <DisplayButtonGroup />
      </FilterWrapper>
      <ButtonWrapper onClick={goAddNewFormHandler}>
        <ButtonText>新增問卷</ButtonText>
      </ButtonWrapper>
    </HeaderWrapper>
  );
};

export default DashboardHeader;
