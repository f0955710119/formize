import { FC } from "react";

import styled from "styled-components";

import questionConfig from "../../../../configs/questionConfig";
import useGetStatisTitleIndex from "../../../../hooks/useGetStatisTitleIndex";
import { StatisResponse } from "../../../../types/statis";
import StatisResponsedItem from "./StatisResponsedItem";

const EmptyList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50rem;
  border-bottom: 1px solid #e8e8e8;
`;

const EmptyListReminder = styled.div`
  font-size: 2rem;
`;

interface StatisResponsedListProps {
  statisData: StatisResponse[];
}

const StatisResponsedList: FC<StatisResponsedListProps> = ({ statisData }) => {
  const getUpdatedTitleIndexHandler = useGetStatisTitleIndex();

  return (
    <>
      {statisData.map((data, index) => {
        const { id, title, type, count, numericData, hasAnswerQuantityText } = data;

        const incomingStatisDataId = id.split("_")[0];
        const titleIndex = getUpdatedTitleIndexHandler(incomingStatisDataId);
        const questionTypeTitle = `${titleIndex}.${questionConfig[type]}題 - `;

        if (hasAnswerQuantityText === "回覆筆數: 0筆") {
          const emptyListReminderText = `${questionTypeTitle}${title} 還沒有回應哦`;
          return (
            <EmptyList key={id}>
              <EmptyListReminder>{emptyListReminderText}</EmptyListReminder>
            </EmptyList>
          );
        }

        const statisTitle =
          questionTypeTitle + title + " " + " " + `(${hasAnswerQuantityText})`;

        const generalStatisResponsedItemProps = {
          index,
          id,
          title: statisTitle,
          type,
          count,
        };

        const statisResponsedItemProps = numericData
          ? { ...generalStatisResponsedItemProps, numericData }
          : generalStatisResponsedItemProps;

        return <StatisResponsedItem key={id} {...statisResponsedItemProps} />;
      })}
    </>
  );
};
export default StatisResponsedList;
