import { FC, useState, useRef } from "react";
import styled from "styled-components";
import AddOptionButton from "../UI/AddOptionButton";
import { ButtonWrapper, ButtonText } from "../UI/Button";
import AddMatrixButton from "./Matrix/AddMatrixButton";
import ChoiceOptionItem from "./ChoiceOptionItem";
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
  flex-direction: column;
  align-items: stretch;
  margin: 0.5rem 0 2rem 0;
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
      <AddMatrixButton id={id} matrixs={matrixs} />
      <MatrixTitleWrapper>
        {matrixs.map((matrix, i) => (
          <MatrixTitle
            key={i}
            id={id}
            matrix={matrix}
            index={i}
            matrixs={matrixs}
          />
        ))}
      </MatrixTitleWrapper>
      <AddOptionButton id={id} options={options} />
      {options.map((option, i) => (
        <ChoiceOptionItem
          key={i}
          id={id}
          option={option}
          options={options}
          index={i}
        />
      ))}
    </MatrixWrapper>
  );
};

export default Matrix;
