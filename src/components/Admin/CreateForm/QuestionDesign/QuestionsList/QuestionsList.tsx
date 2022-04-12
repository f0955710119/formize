import { FC, useState } from "react";
import styled from "styled-components";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import Layout from "../UI/Layout";
import CreatedQuestion from "./CreatedQuestion";
import QuestionPage from "./QuestionPage";

interface QuestionList {
  title: string;
  note: string;
  questionType: number;
}
// BUG: 要去想怎麼做數值對照的轉換( 寫 switch function 匯出對應的中文字) + 設定 config 轉換
const defaultQuestionList: QuestionList[] = [
  { title: "1.您的姓名?", note: "有關係就沒關係", questionType: 0 },
  { title: "2.您的年齡?", note: "有關係就沒關係", questionType: 6 },
  { title: "3.通勤方式?", note: "有關係就沒關係", questionType: 3 },
];

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

interface QuestionsListProps {
  setCurrentStep(number: number): void;
}

const QuestionsList: FC<QuestionsListProps> = ({
  setCurrentStep,
}: QuestionsListProps) => {
  return (
    <ListLayout>
      <Heading>題目列表</Heading>
      <QuestionPage title={"第一頁"}>
        {defaultQuestionList.map((list, i) => (
          <CreatedQuestionWrapper>
            <DeleteSharpIcon key={i} sx={{ width: "20%", height: "2rem" }} />
            <CreatedQuestion
              key={i}
              title={list.title}
              note={list.note}
              questionType={list.questionType}
            />
          </CreatedQuestionWrapper>
        ))}
      </QuestionPage>

      <QuestionPage title={"第一頁"}>
        {defaultQuestionList.map((list, i) => (
          <CreatedQuestionWrapper>
            <DeleteSharpIcon key={i} sx={{ width: "20%", height: "2rem" }} />
            <CreatedQuestion
              key={i}
              title={list.title}
              note={list.note}
              questionType={list.questionType}
            />
          </CreatedQuestionWrapper>
        ))}
      </QuestionPage>

      <Heading>功能</Heading>
      {/* BUG: 為什麼有時候帶styled-component的樣式去component會失敗 */}
      <AddPageButton type="button" onClick={() => console.log("h1")}>
        <ButtonText>新增分頁</ButtonText>
      </AddPageButton>
      <NavigatorButton
        type="button"
        onClick={() => {
          setCurrentStep(3);
        }}
      >
        <ButtonText>前往外觀樣式設計</ButtonText>
      </NavigatorButton>
      <ButtonWrapper
        type="button"
        onClick={() => {
          setCurrentStep(1);
        }}
      >
        <ButtonText>回到資訊設定</ButtonText>
      </ButtonWrapper>
    </ListLayout>
  );
};

export default QuestionsList;
