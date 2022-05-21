import { FC } from "react";
import styled from "styled-components";
import { Question } from "../../../../../types/question";
import ChoiceLimitation from "../../QuestionDesign/QuestionOptions/OptionLimitation/ChoiceLimitation";
import DateLimitation from "../../QuestionDesign/QuestionOptions/OptionLimitation/DateLimitation";
import NumberLimitation from "../../QuestionDesign/QuestionOptions/OptionLimitation/NumberLimitation";
import TextLimitation from "../../QuestionDesign/QuestionOptions/OptionLimitation/TextLimitation";
import SectionHeading from "../../UI/SectionHeading";
import Choice from "./Choice";
import Introduction from "./Introduction";
import Matrix from "./Matrix";

interface QuestionProps {
  question: Question;
}

const QuestionHeading = styled(SectionHeading)`
  font-size: 1.8rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: #777;
  border-bottom: 1px solid #777;
`;

const TextQuestion: FC<QuestionProps> = ({ question }) => {
  return (
    <>
      <QuestionHeading>限制設定</QuestionHeading>
      <TextLimitation id={question.id} />
    </>
  );
};

const IntroductionQuestion: FC<QuestionProps> = ({ question }) => {
  const { id, title } = question;
  return <Introduction id={id} title={title} />;
};

const ChoiceQuestion: FC<QuestionProps> = ({ question }) => {
  const { id, type, options } = question;
  return (
    <>
      <QuestionHeading>限制設定</QuestionHeading>
      <ChoiceLimitation id={id} type={type} />
      <QuestionHeading>內容設定</QuestionHeading>
      <Choice id={id} options={options ? options : [""]} />
    </>
  );
};

const MatrixQuestion: FC<QuestionProps> = ({ question }) => {
  const { id, type, options, matrixs } = question;
  return (
    <>
      <QuestionHeading>限制設定</QuestionHeading>
      <ChoiceLimitation id={id} type={type} />
      <QuestionHeading>內容設定</QuestionHeading>
      <Matrix
        id={id}
        options={options ? options : [""]}
        matrixs={matrixs ? matrixs : [""]}
      />
    </>
  );
};

const NumericQuestion: FC<QuestionProps> = ({ question }) => {
  const { id, validations } = question;
  return (
    <>
      <QuestionHeading>限制設定</QuestionHeading>
      <NumberLimitation id={id} validations={validations} />
    </>
  );
};
const DateQuestion: FC<QuestionProps> = ({ question }) => {
  return (
    <>
      <QuestionHeading>限制設定</QuestionHeading>
      <DateLimitation id={question.id} />
    </>
  );
};

const questionContentConfig: { [key: string]: FC<QuestionProps> } = {
  "0": TextQuestion,
  "1": TextQuestion,
  "2": IntroductionQuestion,
  "3": ChoiceQuestion,
  "4": ChoiceQuestion,
  "5": MatrixQuestion,
  "6": NumericQuestion,
  "7": NumericQuestion,
  "8": ChoiceQuestion,
  "9": DateQuestion,
};

interface QuestionContentProps {
  type: string;
  question: Question;
}

const QuestionContent: FC<QuestionContentProps> = ({ type, question }) => {
  const Content = questionContentConfig[type];
  return <Content question={question} />;
};

export default QuestionContent;
