import { FC } from "react";
import styled from "styled-components";

import { questionIconList } from "../UI/icons";

const iconStyle = {
  width: "1.8rem",
  height: "1.8rem",
  fill: "#aaa",
  transform: "translateY(-0.2rem)",
  marginRight: "0.3rem",
};

interface QuestionIconProps {
  questionType: string;
  style?: string;
}

const renderIcon = ({ questionType, style }: QuestionIconProps) => {
  const Icon = styled(questionIconList[+questionType])`
    ${iconStyle}
    ${style}
  `;

  return <Icon />;
};

const QuestionIcon: FC<QuestionIconProps> = ({ questionType, style }) => {
  return <>{renderIcon({ questionType, style })}</>;
};

export default QuestionIcon;
