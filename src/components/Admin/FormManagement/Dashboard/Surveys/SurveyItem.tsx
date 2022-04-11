import { FC, useState } from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SurveyOptionList from "./SurveyOptionList";

const ItemWrapper = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  padding: 1rem 3rem;
  width: 100%;
  height: 6rem;
  color: #fff;
  font-size: 1.4rem;
  background-color: #aaa;
  box-shadow: 4px 4px 0 transparent;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 4px 4px 0 #777;
    /* transform: translateY(-0.5rem); */
  }

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.span`
  display: block;
  width: 71.3%;
  font-size: 1.8rem;
`;

const ResponseNumber = styled.span`
  width: 4.7%;
`;

const Date = styled.span`
  font-size: 1.4rem;
  width: 10%;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4%;
  height: 100%;

  /* &::after {
    content: "";
    position: absolute;
    top: 100%;
    right: 30%;
    width: 10rem;
    background-color: #333;

    height: 0;
    opacity: 0;
    visibility: hidden;
    transition: height 0.1s ease-in-out, opacity 0.1s ease-in-out;
  }

  &:hover::after {
    height: 5rem;
    opacity: 1;
    visibility: visible;
  } */
`;

interface SurveyItemProps {
  title: string;
  responseNumber: number;
  date: Date;
}

const SurveyItem: FC<SurveyItemProps> = ({
  title,
  responseNumber,
  date,
}: SurveyItemProps) => {
  const [hasClickExpand, setHasClickExpand] = useState<boolean>(false);
  return (
    <ItemWrapper onMouseLeave={() => setHasClickExpand(false)}>
      <Title>{title}</Title>
      <ResponseNumber>{responseNumber}</ResponseNumber>
      <Date>
        {date.toLocaleString("zh-tw", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Date>
      <Date>
        {date.toLocaleString("zh-tw", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Date>
      <IconWrapper onMouseEnter={() => setHasClickExpand(true)}>
        <ExpandMoreIcon
          sx={{ width: "55%", height: "100%", cursor: "pointer" }}
        />
      </IconWrapper>
      {hasClickExpand && <SurveyOptionList />}
    </ItemWrapper>
  );
};

export default SurveyItem;
