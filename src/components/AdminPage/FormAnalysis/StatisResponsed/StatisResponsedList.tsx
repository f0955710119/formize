import { FC } from "react";
import questionConfig from "../../../../configs/questionConfig";
import useGetStatisTitleIndex from "../../../../hooks/useGetStatisTitleIndex";
import { StatisResponse } from "../../../../types/statis";

import StatisResponsedItem from "./StatisResponsedItem";

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
