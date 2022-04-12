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

  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  &::-webkit-scrollbar {
    width: 1rem;
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

const QuestionsList: FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <ListLayout>
      <QuestionPage
        title={"第一頁"}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      >
        {defaultQuestionList.map((list, i) => (
          <CreatedQuestionWrapper>
            <DeleteSharpIcon key={i} sx={{ width: "20%", height: "2rem" }} />
            <CreatedQuestion
              key={i}
              title={list.title}
              note={list.note}
              questionType={list.questionType}
              isExpanded={isExpanded}
            />
          </CreatedQuestionWrapper>
        ))}
      </QuestionPage>
    </ListLayout>
  );
};

export default QuestionsList;
