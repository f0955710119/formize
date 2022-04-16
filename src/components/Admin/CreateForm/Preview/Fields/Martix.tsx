import { FC, useState, useRef } from "react";
import styled from "styled-components";
import AddOptionButton from "./UI/AddOptionButton";
import { ButtonWrapper, ButtonText } from "./UI/Button";
import AddMartixButton from "./Martix/AddMartixButton";
import MartixTitle from "./Martix/MartixTitle";
import MartixRadio from "./Martix/MartixRadio";
import MartixOptionTitle from "./Martix/MartixOptionTitle";
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
  margin: 2rem 0;
  width: 100%;
`;

const MartixOptions = styled(FlexAlignCenter)`
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const OpenDefaultMartixTitleButton = styled(ButtonWrapper)`
  background-color: ${(props) => props.theme.addOption};
  width: 20rem;
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
      <OpenDefaultMartixTitleButton>
        <ButtonText>開啟預設欄位清單</ButtonText>
      </OpenDefaultMartixTitleButton>
      <AddMartixButton id={id} martixs={martixs} />
      <MartixTitleWrapper>
        {martixs.map((martix, i) => (
          <MartixTitle
            key={helper.generateId(6)}
            id={id}
            martix={martix}
            index={i}
            martixs={martixs}
          />
        ))}
      </MartixTitleWrapper>
      <AddOptionButton id={id} options={options} />
      {options.map((option, i) => (
        <MartixOptions key={helper.generateId(6)}>
          <MartixOptionTitle
            id={id}
            index={i}
            option={option}
            options={options}
          />
          <MartixRadio id={id} martixs={martixs} />
        </MartixOptions>
      ))}
    </MartixWrapper>
  );
};

export default Martix;
