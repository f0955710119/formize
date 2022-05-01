import { FC, useContext } from "react";
import styled from "styled-components";
import { adminContext } from "../../../../../store/context/adminContext";
import { Forms } from "../../../../../types/form";
import FormItem from "./FormItem";

const ListContainer = styled.div`
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 6rem;
  }
  font-size: 1.4rem;
`;

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
  line-height: 3rem;
  height: 3rem;
  background-color: rgba(180, 188, 183, 1);
`;

const ResponsedQuantity = styled.span`
  width: 7.5rem;
  text-align: center;
`;

const CreatedTime = styled.span`
  width: 12rem;
  text-align: center;
`;

const ResponsedTime = styled.span`
  width: 12rem;
  text-align: center;
`;

const ExpandMore = styled.span`
  width: 4.5rem;
  text-align: center;
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

const EmptyListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6rem;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  background-color: rgba(180, 188, 183, 0.2);
`;

const EmptyListContainerText = styled.span`
  font-size: 1.4rem;
  color: #777;
`;

const FormList: FC = () => {
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
      {groupListArray.map((group) => {
        const hasForms = context.forms.length > 0;
        const hasResponsedForms = hasForms
          ? context.forms.filter((form) => form.groupId === group.id)
          : [];
        const groupForms =
          hasResponsedForms.length > 0 ? hasResponsedForms : ["1"];

        return (
          <ListContainer key={group.id}>
            <ListColumnTitleContainer>
              <GroupTagWrapper>
                <GroupTag>{group.name}</GroupTag>
              </GroupTagWrapper>

              <ResponsedQuantity>回應數量</ResponsedQuantity>
              <CreatedTime>創建時間</CreatedTime>
              <ResponsedTime>最新回應時間</ResponsedTime>
              <ExpandMore>更多</ExpandMore>
            </ListColumnTitleContainer>
            <ListWrapper>
              {groupForms.map((form, i) => {
                if (form === "1" || typeof form === "string") {
                  return (
                    <EmptyListContainer key={i}>
                      <EmptyListContainerText>
                        此群組還沒有問卷唷!
                      </EmptyListContainerText>
                    </EmptyListContainer>
                  );
                }

                const dateCreatedArray = Object.values(
                  (form as Forms).createdTime
                );
                const dateResponsedArray =
                  form.latestResponsedTime !== null
                    ? Object.values(form.latestResponsedTime)
                    : null;
                const dateCreated = new Date(dateCreatedArray[0] * 1000);
                const dateResponsed =
                  dateResponsedArray !== null
                    ? new Date(dateResponsedArray[0] * 1000)
                    : null;

                return (
                  <FormItem
                    formId={form.id}
                    title={form.title}
                    responseNumber={form.responsedTimes}
                    dateCreated={dateCreated}
                    dateResponsed={dateResponsed}
                    key={form.id}
                  />
                );
              })}
            </ListWrapper>
          </ListContainer>
        );
      })}
    </>
  );
};

export default FormList;
