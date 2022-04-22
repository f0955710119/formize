import { FC, ReactNode, useState } from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  width: 100%;
  border: 1px solid #c8c8c8;
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
  children: ReactNode;
}

const QuestionPage: FC<QuestionPageProps> = ({
  title,
  children,
}: QuestionPageProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  return (
    <PageWrapper>
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
