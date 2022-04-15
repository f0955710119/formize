import { FC } from "react";
import styled from "styled-components";
import SurveyItem from "./SurveyItem";

const test = [
  "瓦斯填答表",
  "不相信音樂購票",
  "可不可團購",
  "瓦斯填答表",
  "不相信音樂購票",
  "可不可團購",
  "瓦斯填答表",
  "不相信音樂購票",
  "可不可團購",
];

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SurveyList: FC = () => {
  return (
    <ListWrapper>
      {test.map((t, s) => (
        <SurveyItem title={t} responseNumber={100} date={new Date()} key={s} />
      ))}
    </ListWrapper>
  );
};

export default SurveyList;
