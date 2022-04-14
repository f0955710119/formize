import { FC } from "react";
import styled from "styled-components";

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

const CreatedQuestion: FC<CreatedQuestionProps> = ({
  title,
  note,
  questionType,
}: CreatedQuestionProps) => {
  return (
    <QuestionWrapper>
      <Title>{title}</Title>
      {/* BUG: 帶入數字TYPE會報錯，但改文字就可以，為何 */}
      <DefaultIcon color={questionType} />
      <Note>{note}</Note>
    </QuestionWrapper>
  );
};

export default CreatedQuestion;

{
  /* <ExpandMoreIcon sx={{ width: "10%", height: "2rem" }} /> */
}
