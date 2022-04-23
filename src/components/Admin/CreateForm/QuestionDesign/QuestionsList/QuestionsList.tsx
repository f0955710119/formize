import { FC, useState } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import useSwitchCurrentStep from "../../../../../hooks/useSwitchCurrentStep";
import useDeleteQuestion from "../../../../../hooks/useDeleteQuestion";

import styled from "styled-components";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

import Layout from "../../UI/Layout";
import CreatedQuestion from "./CreatedQuestion";
import QuestionPage from "./QuestionPage";

import helper from "../../../../../utils/helper";
import NewPageModal from "./NewPageModal";
import MultiPage from "./MultiPage";
import SinglePage from "./SinglePage";

const ListLayout = styled(Layout)`
  width: 22%;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f90;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
`;

const CreatedQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
`;

const Heading = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  font-size: 1.6rem;
  color: #a46302;
  border-bottom: 0.1px solid #a46302;
`;

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 3rem;
  width: 100%;
  height: 4rem;
  background-color: #c8c8c8;
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
`;

const AddPageButton = styled(ButtonWrapper)`
  background-color: #a46302;
`;

const NavigatorButton = styled(ButtonWrapper)`
  background-color: #f90;
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 100%;
`;

const QuestionsList: FC = () => {
  const [hasOpenModal, setHasOpenModal] = useState<boolean>(false);
  const { mode, pageQuantity } = useAppSelector((state) => state.setting);
  const { questions, editingQuestion } = useAppSelector(
    (state) => state.question
  );

  const deleteQuestionHandler = useDeleteQuestion(editingQuestion);
  const switchStepHandler = useSwitchCurrentStep();
  const indexArr = helper.generateQuestionIndexArr(questions);
  const multiPageQuestionIndexArr = helper.generateQuestionMultiPageIndexArr(
    pageQuantity,
    questions
  );

  return (
    <ListLayout>
      {hasOpenModal && (
        <NewPageModal hasOpenModal={hasOpenModal} setModal={setHasOpenModal} />
      )}
      <Heading>題目列表</Heading>
      {mode === "1" ? (
        <>
          {Array(pageQuantity)
            .fill(null)
            .map((_, i) => (
              <MultiPage
                key={i}
                page={i + 1}
                titleIndexArr={multiPageQuestionIndexArr[i]}
                deleteQuestionHandler={deleteQuestionHandler}
              />
            ))}
        </>
      ) : (
        <>
          {questions.map((question, i) => {
            const { id, type, note, title } = question;
            const handledTitle =
              type === "2" ? "引言" : `${indexArr[i]} ${title}`;
            return (
              <SinglePage
                id={id}
                type={type}
                title={handledTitle}
                note={note}
                deleteQuestionHandler={deleteQuestionHandler}
              />
            );
          })}
        </>
      )}

      <Heading>功能</Heading>
      <AddPageButton
        type="button"
        onClick={() => {
          if (questions.length === 0) {
            alert("因為分頁型問卷不得有空白頁，請先新增至少一題才能加分頁唷!");
            return;
          }
          setHasOpenModal(true);
        }}
      >
        <ButtonText>新增分頁</ButtonText>
      </AddPageButton>
      <NavigatorButton
        type="button"
        onClick={() => {
          switchStepHandler(3);
        }}
      >
        <ButtonText>前往外觀樣式設計</ButtonText>
      </NavigatorButton>
      <ButtonWrapper
        type="button"
        onClick={() => {
          switchStepHandler(1);
        }}
      >
        <ButtonText>回到資訊設定</ButtonText>
      </ButtonWrapper>
    </ListLayout>
  );
};

export default QuestionsList;
