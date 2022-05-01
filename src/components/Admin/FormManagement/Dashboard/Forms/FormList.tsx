import { FC, useContext } from "react";
import styled from "styled-components";
import { adminContext } from "../../../../../store/context/adminContext";
import { Forms } from "../../../../../types/form";
import FormItem from "./FormItem";

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
            <GroupTag>{group.name}</GroupTag>
            <ListWrapper>
              {groupForms.map((form) => {
                if (form === "1" || typeof form === "string") {
                  return (
                    <EmptyListContainer>
                      <EmptyListContainerText>
                        此群組還沒有問卷唷!
                      </EmptyListContainerText>
                    </EmptyListContainer>
                  );
                }

                const dataArray = Object.values((form as Forms).createdTime);
                const data = new Date(dataArray[0] * 1000);
                return (
                  <FormItem
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
        );
      })}
    </>
  );
};

export default FormList;
