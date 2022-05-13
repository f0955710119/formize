import { FC } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../store/slice/questionSlice";
import Field from "./UI/Field";
import TitleIndex from "./UI/TitleIndex";
import EditableTitle from "./UI/EditableTitle";
import Note from "./UI/Note";
import type { Question } from "../../../../types/question";

import OneLineText from "./Fields/OneLineText";
import MultiLineText from "./Fields/MultiLineText";
import Introduction from "./Fields/Introduction";
import Choice from "./Fields/OneChoice";
import MultiChoice from "./Fields/MultiChoice";
import Matrix from "./Fields/Matrix";
import Slider from "./Fields/Slider";
import SequenceWeight from "./Fields/Sort";
import Date from "./Fields/Date";
import QuestionDeleteButton from "./QuestionDeleteButton";
import useDeleteQuestion from "../../../../hooks/useDeleteQuestion";
import TextLimitation from "../QuestionDesign/QuestionOptions/OptionLimitation/TextLimitation";
import NumberLimitation from "../QuestionDesign/QuestionOptions/OptionLimitation/NumberLimitation";
import DateLimitation from "../QuestionDesign/QuestionOptions/OptionLimitation/DateLimitation";
import ChoiceLimitation from "../QuestionDesign/QuestionOptions/OptionLimitation/ChoiceLimitation";
import sweetAlert from "../../../../utils/sweetAlert";
import helper from "../../../../utils/helper";
import useCheckQuestionArraySameString from "../../../../hooks/useCheckQuestionArraySameString";
import useGetQuestionTitleIndex from "../../../../hooks/useGetQuestionTitleIndex";

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

interface QuestionFieldProps {
  question: Question;
  titleIndex: string;
}

const renderResponseQuestion = (type: string, question: Question) => {
  switch (type) {
    case "0":
    case "1":
      return <TextLimitation id={question.id} />;
    case "2":
      return <Introduction id={question.id} title={question.title} />;
    case "3":
    case "4":
    case "8":
      if (question.options) {
        return (
          <>
            <Choice id={question.id} options={question.options} />
            <ChoiceLimitation id={question.id} type={type} />
          </>
        );
      }

    case "5":
      if (question.options && question.matrixs) {
        return (
          <>
            <Matrix
              id={question.id}
              options={question.options}
              matrixs={question.matrixs}
            />
            <ChoiceLimitation id={question.id} type={type} />
          </>
        );
      }

    case "6":
    case "7": {
      return (
        <NumberLimitation id={question.id} validations={question.validations} />
      );
    }

    case "9":
      return (
        <>
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
  const { editingQuestion, isEditingOption, questions } = useAppSelector(
    (state) => state.question
  );
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

      if (!target.classList[0].includes("ChoiceOptionItem")) return;
      dispatch(questionActions.setIsSwitchingEditingOption(true));
    };

    if (!isEditingOption) {
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
        }」\n還有正在編輯的「選項」，\n直接切換編輯題目將不會存儲，\n確定要直接切換嗎?`,
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
      <QuestionDeleteButton
        id={question.id}
        text="X"
        clickHandler={() => {
          deleteAddedQuestionHandler(question.id);
        }}
      />
      {question.type !== "2" && (
        <>
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
