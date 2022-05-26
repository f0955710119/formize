import { FC } from "react";

import styled from "styled-components";

import useAppDispatch from "../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../hooks/useAppSelector";
import useCheckQuestionArraySameString from "../../../../hooks/useCheckQuestionArraySameString";
import useDeleteQuestion from "../../../../hooks/useDeleteQuestion";
import useGetQuestionTitleIndex from "../../../../hooks/useGetQuestionTitleIndex";
import { questionActions } from "../../../../store/slice/questionSlice";
import type { Question } from "../../../../types/question";
import sweetAlert from "../../../../utils/sweetAlert";
import SectionHeading from "../UI/SectionHeading";
import QuestionContent from "./QuestionContent/QuestionContent";
import QuestionDeleteButton from "./QuestionDeleteButton";
import EditableTitle from "./UI/EditableTitle";
import Field, { SwitchFieldReminder } from "./UI/Field";
import Note from "./UI/Note";
import TitleIndex from "./UI/TitleIndex";

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

const QuestionField: FC<QuestionFieldProps> = ({
  question,
  titleIndex,
}: QuestionFieldProps) => {
  const dispatch = useAppDispatch();
  const { editingQuestionId, isEditingOption, isEditingMatrix, questions } = useAppSelector(
    (state) => state.question
  );
  const checkHasNoSameArrayStringNameHandler = useCheckQuestionArraySameString();
  const getTitleIndexHandler = useGetQuestionTitleIndex();

  const editingFieldHandler = (question: Question, target: Element) => {
    const { id, page } = question;
    const hasSwitched = editingQuestionId && editingQuestionId === question.id;
    if (hasSwitched) return;
    const hasNoSameStringName = checkHasNoSameArrayStringNameHandler();
    if (!hasNoSameStringName) return;

    const confirmToSwitchEditingFieldCallback = () => {
      const hasId = target.id ? true : false;
      const hasSameId = target.id === id;
      const staySameQuestion = hasId && hasSameId;
      const switchQuestionItem = staySameQuestion ? null : id;
      dispatch(questionActions.switchEditingField({ id: switchQuestionItem, page }));
    };

    if (!isEditingOption && !isEditingMatrix) {
      confirmToSwitchEditingFieldCallback();
      return;
    }

    if (editingQuestionId === null) return;
    const questionTitleIndex = getTitleIndexHandler(editingQuestionId);
    const responseQuestion = questions.find((question) => question.id === editingQuestionId);

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
      isActive={question.id === editingQuestionId}
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
      <QuestionContent type={question.type} question={question} />
    </Field>
  );
};

export default QuestionField;
