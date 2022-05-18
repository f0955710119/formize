import { FC } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../store/slice/questionSlice";
import Field, { SwitchFieldReminder } from "./UI/Field";
import TitleIndex from "./UI/TitleIndex";
import EditableTitle from "./UI/EditableTitle";
import Note from "./UI/Note";
import type { Question } from "../../../../types/question";

import Introduction from "./QuestionContent/Introduction";
import Choice from "./QuestionContent/Choice";
import Matrix from "./QuestionContent/Matrix";

import QuestionDeleteButton from "./QuestionDeleteButton";
import useDeleteQuestion from "../../../../hooks/useDeleteQuestion";
import TextLimitation from "../QuestionDesign/QuestionOptions/OptionLimitation/TextLimitation";
import NumberLimitation from "../QuestionDesign/QuestionOptions/OptionLimitation/NumberLimitation";
import DateLimitation from "../QuestionDesign/QuestionOptions/OptionLimitation/DateLimitation";
import ChoiceLimitation from "../QuestionDesign/QuestionOptions/OptionLimitation/ChoiceLimitation";
import sweetAlert from "../../../../utils/sweetAlert";

import useCheckQuestionArraySameString from "../../../../hooks/useCheckQuestionArraySameString";
import useGetQuestionTitleIndex from "../../../../hooks/useGetQuestionTitleIndex";
import SectionHeading from "../UI/SectionHeading";

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const QuestionHeading = styled(SectionHeading)`
  font-size: 1.8rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: #777;
  border-bottom: 1px solid #777;
`;

interface QuestionFieldProps {
  question: Question;
  titleIndex: string;
}

const renderResponseQuestion = (type: string, question: Question) => {
  switch (type) {
    case "0":
    case "1":
      return (
        <>
          <QuestionHeading>限制設定</QuestionHeading>
          <TextLimitation id={question.id} />
        </>
      );
    case "2":
      return <Introduction id={question.id} title={question.title} />;
    case "3":
    case "4":
    case "8":
      if (question.options) {
        return (
          <>
            <QuestionHeading>限制設定</QuestionHeading>
            <ChoiceLimitation id={question.id} type={type} />
            <QuestionHeading>內容設定</QuestionHeading>
            <Choice id={question.id} options={question.options} />
          </>
        );
      }

    case "5":
      if (question.options && question.matrixs) {
        return (
          <>
            <QuestionHeading>限制設定</QuestionHeading>
            <ChoiceLimitation id={question.id} type={type} />
            <QuestionHeading>內容設定</QuestionHeading>
            <Matrix
              id={question.id}
              options={question.options}
              matrixs={question.matrixs}
            />
          </>
        );
      }

    case "6":
    case "7": {
      return (
        <>
          <QuestionHeading>限制設定</QuestionHeading>
          <NumberLimitation
            id={question.id}
            validations={question.validations}
          />
        </>
      );
    }

    case "9":
      return (
        <>
          <QuestionHeading>限制設定</QuestionHeading>
          <DateLimitation id={question.id} />
        </>
      );
  }
};

const QuestionField: FC<QuestionFieldProps> = ({
  question,
  titleIndex,
}: QuestionFieldProps) => {
  const dispatch = useAppDispatch();
  const { editingQuestion, isEditingOption, isEditingMatrix, questions } =
    useAppSelector((state) => state.question);
  const checkHasNoSameArrayStringNameHandler =
    useCheckQuestionArraySameString();

  const getTitleIndexHandler = useGetQuestionTitleIndex();

  const editingFieldHandler = (question: Question, target: Element) => {
    const hasSwitched = editingQuestion && editingQuestion.id === question.id;
    if (hasSwitched) return;
    const hasNoSameStringName = checkHasNoSameArrayStringNameHandler();
    if (!hasNoSameStringName) return;

    const confirmToSwitchEditingFieldCallback = () => {
      dispatch(questionActions.willChangeLimitationValue(true));
      dispatch(questionActions.switchEditingFormPage(question.page));
      const hasId = target.id ? true : false;
      if (hasId && target.id === question.id) {
        dispatch(questionActions.switchEditingQuestion(null));
        return;
      }
      dispatch(questionActions.switchEditingQuestion(question));

      if (target.classList[0].includes("ChoiceOptionItem")) {
        dispatch(questionActions.setIsSwitchingEditingOption(true));
        return;
      }

      if (target.classList[0].includes("MatrixTitle")) {
        dispatch(questionActions.setIsSwitchingEditingMatrix(true));
      }
    };

    if (!isEditingOption && !isEditingMatrix) {
      confirmToSwitchEditingFieldCallback();
      return;
    }

    if (editingQuestion === null) return;
    const questionTitleIndex = getTitleIndexHandler(editingQuestion.id);
    const responseQuestion = questions.find(
      (question) => question.id === editingQuestion.id
    );

    sweetAlert.clickToConfirmAlert(
      {
        title: "準備切換編輯題目",
        text: `發現「${questionTitleIndex}.${
          responseQuestion ? responseQuestion.title : ""
        }」\n還有正在編輯的內容，\n直接切換編輯題目將不會存儲，\n確定要直接切換嗎?`,
        cancelButtonText: "取消",
        confirmButtonText: "確定",
      },
      confirmToSwitchEditingFieldCallback
    );
  };

  const deleteAddedQuestionHandler = useDeleteQuestion();

  return (
    <Field
      key={question.id}
      onClick={(event) => {
        const { target } = event;
        editingFieldHandler(question, target as Element);
      }}
      isActive={question.id === editingQuestion?.id}
    >
      <SwitchFieldReminder>點擊切換編輯中的題目</SwitchFieldReminder>
      <QuestionDeleteButton
        id={question.id}
        text="X"
        clickHandler={() => {
          deleteAddedQuestionHandler(question.id);
        }}
      />
      {question.type !== "2" && (
        <>
          <QuestionHeading>標題設定</QuestionHeading>
          <TitleWrapper>
            <TitleIndex titleIndex={titleIndex} />
            <EditableTitle id={question.id} title={question.title} />
          </TitleWrapper>
          <Note id={question.id} note={question.note} />
        </>
      )}
      {renderResponseQuestion(question.type, question)}
    </Field>
  );
};

export default QuestionField;
