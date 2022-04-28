import { FC, useContext } from "react";
import styled from "styled-components";
import { adminContext } from "../../../../../store/context/adminContext";
import { Group } from "../../../../../types/firebase/usersType";
import SurveyItem from "./SurveyItem";

const ListContainer = styled.div`
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const GroupTag = styled.div`
  display: inline-block;
  padding: 0 4rem;
  line-height: 3rem;
  height: 3rem;
  background-color: rgba(180, 188, 183, 1);
`;

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: none;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const SurveyList: FC = () => {
  const context = useContext(adminContext);
  const isShowAllForm = context.editingGroupId === "0";
  const showSingleGroup = () => {
    const hasResponsedGroup = context.groups.find(
      (group) => group.id === context.editingGroupId
    );
    if (!hasResponsedGroup) return context.groups[0];
    return hasResponsedGroup;
  };
  const groupListArray = isShowAllForm ? context.groups : [showSingleGroup()];

  return (
    <>
      {groupListArray.map((group) => (
        <ListContainer key={group.id}>
          <GroupTag>{group.name}</GroupTag>
          <ListWrapper>
            {context.surveys.length > 0 &&
              context.surveys
                .filter((form) => form.groupId === group.id)
                .map((form) => {
                  const dataArray = Object.values(form.createdTime);
                  const data = new Date(dataArray[0] * 1000);
                  return (
                    <SurveyItem
                      formId={form.id}
                      title={form.title}
                      responseNumber={form.responsedTimes}
                      date={data}
                      key={form.id}
                    />
                  );
                })}
          </ListWrapper>
        </ListContainer>
      ))}
    </>
  );
};

export default SurveyList;
