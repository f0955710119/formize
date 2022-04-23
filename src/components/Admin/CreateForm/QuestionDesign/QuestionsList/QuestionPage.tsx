import { FC, ReactNode, useState } from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

interface PageWrapperProps {
  isActive: boolean;
}

const PageWrapper = styled.div<PageWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  width: 100%;
  border: ${(props: PageWrapperProps) =>
    props.isActive ? " 2px solid#333 " : "1px solid  #c8c8c8"};
  transition: border 0.3s;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* margin-bottom: 1rem; */
`;

const Title = styled.div`
  font-size: 1.8rem;
  width: 90%;
`;

interface QuestionPageProps {
  title: string;
  isActive: boolean;
  page: number;
  children: ReactNode;
}

const QuestionPage: FC<QuestionPageProps> = ({
  title,
  isActive,
  page,
  children,
}: QuestionPageProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { editingFormPage } = useAppSelector((state) => state.question);

  const switchEditingFormPageHandler = (target: Element, page: number) => {
    console.log(target);
    dispatch(questionActions.switchEditingFormPage(page));
    dispatch(questionActions.willChangeLimitationValue(true));
    dispatch(questionActions.switchEditingQuestion(null));
  };

  return (
    <PageWrapper
      isActive={isActive}
      onClick={(event) => {
        if (editingFormPage === page) return;
        const target = event.target as Element;
        switchEditingFormPageHandler(target, page);
      }}
    >
      <TitleWrapper>
        <Title>{title}</Title>
        {!isExpanded && (
          <ExpandMoreIcon
            sx={{ width: "10%", height: "2rem" }}
            // BUG: 該怎麼使用prevState
            onClick={() => setIsExpanded(true)}
          />
        )}
        {isExpanded && (
          <ExpandMoreIcon
            sx={{ width: "10%", height: "2rem", transform: "rotate(-180deg)" }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </TitleWrapper>
      {isExpanded && children}
    </PageWrapper>
  );
};

export default QuestionPage;
