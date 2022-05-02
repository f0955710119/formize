import { FC, useState, useRef } from "react";
import styled from "styled-components";
import AddOptionButton from "../UI/AddOptionButton";
import { ButtonWrapper, ButtonText } from "../UI/Button";
import AddMatrixButton from "./Matrix/AddMatrixButton";
import MatrixTitle from "./Matrix/MatrixTitle";
import MatrixRadio from "./Matrix/MatrixRadio";
import MatrixOptionTitle from "./Matrix/MatrixOptionTitle";
import helper from "../../../../../utils/helper";

const MatrixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FlexAlignCenter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const MatrixTitleWrapper = styled(FlexAlignCenter)`
  justify-content: end;
  margin: 2rem 0;
  width: 100%;
`;

const MatrixOptions = styled(FlexAlignCenter)`
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const OpenDefaultMatrixTitleButton = styled(ButtonWrapper)`
  background-color: ${(props) => props.theme.addOption};
  width: 20rem;
`;

interface MatrixProps {
  id: string;
  options: string[];
  matrixs: string[];
}

const Matrix: FC<MatrixProps> = ({ id, options, matrixs }: MatrixProps) => {
  return (
    <MatrixWrapper>
      <OpenDefaultMatrixTitleButton>
        <ButtonText>開啟預設欄位清單</ButtonText>
      </OpenDefaultMatrixTitleButton>
      <AddMatrixButton id={id} matrixs={matrixs} />
      <MatrixTitleWrapper>
        {matrixs.map((matrix, i) => (
          <MatrixTitle
            key={helper.generateId(6)}
            id={id}
            matrix={matrix}
            index={i}
            matrixs={matrixs}
          />
        ))}
      </MatrixTitleWrapper>
      <AddOptionButton id={id} options={options} />
      {options.map((option, i) => (
        <MatrixOptions key={helper.generateId(6)}>
          <MatrixOptionTitle
            id={id}
            index={i}
            option={option}
            options={options}
          />
          <MatrixRadio id={id} matrixs={matrixs} />
        </MatrixOptions>
      ))}
    </MatrixWrapper>
  );
};

export default Matrix;
