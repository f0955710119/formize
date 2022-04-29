import { FC } from "react";
import styled from "styled-components";

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 12rem;
  padding-left: 3rem;
`;

const TitleText = styled.span`
  font-size: 1.6rem;
  color: #555;
`;

interface FormItemExpandTitleProps {
  text: string;
}

const FormItemExpandTitle: FC<FormItemExpandTitleProps> = ({
  text,
}: FormItemExpandTitleProps) => {
  return (
    <TitleWrapper>
      <TitleText>{text}</TitleText>
    </TitleWrapper>
  );
};

export default FormItemExpandTitle;
