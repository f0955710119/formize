import { FC, useState, useRef } from "react";
import styled from "styled-components";
import { ButtonWrapper } from "./UI/AddOptionButton";
import AddMartixButton from "./Martix/AddMartixButton";
import MartixTitle from "./Martix/MartixTitle";
import MartixRadio from "./Martix/MartixRadio";
import helper from "../../../../../utils/helper";

const MartixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FlexAlignCenter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const MartixTitleWrapper = styled(FlexAlignCenter)`
  justify-content: end;
  margin-bottom: 1rem;
`;

const MartixOptionTitle = styled.span`
  width: 50%;
  font-size: 1.8rem;
`;

const MartixOptions = styled(FlexAlignCenter)`
  justify-content: space-between;
  margin-bottom: 1rem;
`;

interface MartixProps {
  id: string;
  options: string[];
  martixs: string[];
}

const Martix: FC<MartixProps> = ({ id, options, martixs }: MartixProps) => {
  // 之後樣式用綁ref的方式去得到title的width值，來改變選項的位置 > window.getComputedStyle(document.querySelector('#mainbar')).width
  return (
    <MartixWrapper>
      <ButtonWrapper>開啟預設欄位清單</ButtonWrapper>
      <MartixTitleWrapper>
        <AddMartixButton id={id} martixs={martixs} />
        {martixs.map((martix, i) => (
          <MartixTitle key={i} id={id} martix={martix} />
        ))}
      </MartixTitleWrapper>
      {options.map((option) => (
        <MartixOptions key={helper.generateId(6)}>
          <MartixOptionTitle>{option}</MartixOptionTitle>
          <MartixRadio id={id} martixs={martixs} />
        </MartixOptions>
      ))}
      <button>新增選項列表</button>
    </MartixWrapper>
  );
};

export default Martix;
