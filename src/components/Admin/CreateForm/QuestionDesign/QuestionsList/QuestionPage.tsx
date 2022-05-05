import { FC, ReactNode, useState } from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../store/slice/questionSlice";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import scrollBar from "../../../../UI/scrollBar";

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
  border-radius: 3px;
  border: ${(props: PageWrapperProps) =>
    props.isActive ? " 3px solid#777 " : "1px solid  #c8c8c8"};
  transition: border 0.3s;

  @media ${breakpointConfig.laptopM} {
    margin-top: 2rem;
    padding: 2rem 1rem;
    margin-bottom: 0;
    overflow-y: auto;
    ${scrollBar}
  } ;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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

  const switchEditingFormPageHandler = (page: number) => {
    dispatch(questionActions.switchEditingFormPage(page));
    dispatch(questionActions.willChangeLimitationValue(true));
    dispatch(questionActions.switchEditingQuestion(null));
  };

  return (
    <PageWrapper
      isActive={isActive}
      onClick={(event: any) => {
        if (event.target.nodeName === "svg" || event.target.nodeName === "path")
          return;
        if (editingFormPage === page) return;

        switchEditingFormPageHandler(page);
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
