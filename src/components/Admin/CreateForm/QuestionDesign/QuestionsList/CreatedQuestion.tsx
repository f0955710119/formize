import { FC } from "react";
import styled from "styled-components";

import TextFormatSharpIcon from "@mui/icons-material/TextFormatSharp";
import TextIncreaseSharpIcon from "@mui/icons-material/TextIncreaseSharp";
import FormatQuoteSharpIcon from "@mui/icons-material/FormatQuoteSharp";
import AdjustSharpIcon from "@mui/icons-material/AdjustSharp";
import FormatListNumberedSharpIcon from "@mui/icons-material/FormatListNumberedSharp";
import LooksOneSharpIcon from "@mui/icons-material/LooksOneSharp";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import LayersSharpIcon from "@mui/icons-material/LayersSharp";
import QueryBuilderSharpIcon from "@mui/icons-material/QueryBuilderSharp";

const QuestionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.4rem 1rem;
  width: 80%;
  border: 1px solid #c8c8c8;
`;

const Title = styled.div`
  font-size: 1.8rem;
  width: 90%;
  margin-bottom: 0.5rem;
`;

interface DefaultIconProps {
  readonly color: string;
}

const DefaultIcon = styled.div<DefaultIconProps>`
  width: 10%;
  height: 2.4rem;
  background-color: ${(props: DefaultIconProps) => {
    switch (props.color) {
      case "0": {
        return "red";
      }
      case "6": {
        return "orange";
      }
      case "3": {
        return "yellow";
      }
    }
  }};
`;

const Note = styled.div`
  width: 100%;
  font-size: 1.4rem;
  color: #aaa;
`;

interface CreatedQuestionProps {
  title: string;
  note: string;
  questionType: string;
}

const generateIcon = (questionType: string) => {
  switch (questionType) {
    case "0":
      return <TextFormatSharpIcon />;
    case "1":
      return <TextIncreaseSharpIcon />;
    case "2":
      return <FormatQuoteSharpIcon />;
    case "3":
      return <AdjustSharpIcon />;
    case "4":
      return <FormatListNumberedSharpIcon />;
    case "5":
      return <LooksOneSharpIcon />;
    case "6":
      return <TuneSharpIcon />;
    case "7":
      return <LayersSharpIcon />;
    case "8":
      return <QueryBuilderSharpIcon />;
    case "9":
      return <LooksOneSharpIcon />;
  }
};

const CreatedQuestion: FC<CreatedQuestionProps> = ({
  title,
  note,
  questionType,
}: CreatedQuestionProps) => {
  return (
    <QuestionWrapper>
      <Title>{title}</Title>
      {/* BUG: 帶入數字TYPE會報錯，但改文字就可以，為何 */}
      {generateIcon(questionType)}
      <Note>{note}</Note>
    </QuestionWrapper>
  );
};

export default CreatedQuestion;

{
  /* <ExpandMoreIcon sx={{ width: "10%", height: "2rem" }} /> */
}
