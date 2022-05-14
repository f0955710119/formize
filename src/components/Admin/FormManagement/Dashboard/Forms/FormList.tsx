import { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import breakpointConfig from "../../../../../configs/breakpointConfig";
import { adminContext } from "../../../../../store/context/adminContext";
import { Forms } from "../../../../../types/form";
import helper from "../../../../../utils/helper";
import FormCard from "./FormCard";
import FormItem from "./FormItem";

const FormsContainer = styled.div`
  width: 100%;
  font-size: 1.4rem;

  &:not(:last-child) {
    margin-bottom: 6rem;
  }
`;

const ListContainer = styled(FormsContainer)`
  @media ${breakpointConfig.tablet} {
    display: none;
  } ;
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

const FormWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: none;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

// const ListWrapper = styled(FormWrapper)``;

const EmptyListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6rem;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  background-color: #fdd87238;
`;

const EmptyListContainerText = styled.span`
  font-size: 1.6rem;
  color: #777;
`;

const CardContainer = styled(FormsContainer)`
  display: none;
  @media ${breakpointConfig.tablet} {
    display: block;
  } ;
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
      {groupListArray[0] === undefined ? (
        <></>
      ) : (
        <>
          {groupListArray.map((group) => {
            const hasForms = context.forms && context.forms?.length > 0;
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
                  <CreatedTime>創建日期</CreatedTime>
                  <ResponsedTime>最新回應日期</ResponsedTime>
                  <ExpandMore></ExpandMore>
                </ListColumnTitleContainer>
                <FormWrapper>
                  {groupForms.map((form, i) => {
                    if (form === "1" || typeof form === "string") {
                      return (
                        <EmptyListContainer key={i}>
                          <EmptyListContainerText>
                            此群組還沒有問卷唷
                          </EmptyListContainerText>
                        </EmptyListContainer>
                      );
                    }
                    const dateCreated = helper.convertFirebaseTimeToDate(
                      (form as Forms).createdTime
                    );
                    const dateResponsed =
                      form.latestResponsedTime !== null
                        ? helper.convertFirebaseTimeToDate(
                            form.latestResponsedTime
                          )
                        : null;
                    return (
                      <FormItem
                        formId={form.id}
                        title={form.title}
                        responsedTimes={form.responsedTimes}
                        dateCreated={dateCreated}
                        dateResponsed={dateResponsed}
                        key={form.id}
                      />
                    );
                  })}
                </FormWrapper>
              </ListContainer>
            );
          })}
          {groupListArray.map((group) => {
            const hasForms = context.forms && context.forms?.length > 0;
            const hasResponsedForms = hasForms
              ? context.forms.filter((form) => form.groupId === group.id)
              : [];
            const groupForms =
              hasResponsedForms.length > 0 ? hasResponsedForms : ["1"];

            return (
              <CardContainer key={group.id}>
                <GroupTag>{group.name}</GroupTag>
                <FormWrapper>
                  {groupForms.map((form, i) => {
                    if (form === "1" || typeof form === "string") {
                      return (
                        <EmptyListContainer key={i}>
                          <EmptyListContainerText>
                            此群組還沒有問卷唷
                          </EmptyListContainerText>
                        </EmptyListContainer>
                      );
                    }
                    const dateCreated = helper.convertFirebaseTimeToDate(
                      (form as Forms).createdTime
                    );
                    const dateResponsed =
                      form.latestResponsedTime !== null
                        ? helper.convertFirebaseTimeToDate(
                            form.latestResponsedTime
                          )
                        : null;
                    return (
                      <FormCard
                        formId={form.id}
                        title={form.title}
                        responsedTimes={form.responsedTimes}
                        dateCreated={dateCreated}
                        dateResponsed={dateResponsed}
                        key={form.id}
                      />
                    );
                  })}
                </FormWrapper>
              </CardContainer>
            );
          })}
        </>
      )}
    </>
  );
};

export default FormList;
