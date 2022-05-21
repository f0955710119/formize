import { FC } from "react";
import styled from "styled-components";

const ListColumnTitleContainer = styled.div`
  width: 100%;
  display: flex;
`;

const GroupTagWrapper = styled.div`
  display: inline-block;
  width: calc(100% - 36rem);
`;

const GroupTag = styled.div`
  display: inline-block;
  padding: 0 4rem;
  height: 4rem;
  line-height: 4rem;
  font-size: 1.6rem;
  background-color: #c9ab59;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const ColumnTitle = styled.span`
  font-size: 1.5rem;
  text-align: center;
`;

const ResponsedQuantity = styled(ColumnTitle)`
  width: 7.5rem;
`;

const CreatedTime = styled(ColumnTitle)`
  width: 12rem;
`;

const ResponsedTime = styled(ColumnTitle)`
  width: 12rem;
`;

const ExpandMore = styled(ColumnTitle)`
  width: 4.5rem;
`;

interface GroupListColumnProps {
  name: string;
}

const GroupListColumn: FC<GroupListColumnProps> = ({ name }) => {
  return (
    <ListColumnTitleContainer>
      <GroupTagWrapper>
        <GroupTag>{name}</GroupTag>
      </GroupTagWrapper>
      <ResponsedQuantity>回應數量</ResponsedQuantity>
      <CreatedTime>創建日期</CreatedTime>
      <ResponsedTime>最新回應日期</ResponsedTime>
      <ExpandMore></ExpandMore>
    </ListColumnTitleContainer>
  );
};

export default GroupListColumn;
