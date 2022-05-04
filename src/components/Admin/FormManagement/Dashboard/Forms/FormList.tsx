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
  background-color: rgba(180, 188, 183, 0.2);
`;

const EmptyListContainerText = styled.span`
  font-size: 1.4rem;
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
  const [isWiderThanTablet, setIsWiderThanTablet] = useState<boolean>(
    window.innerWidth > 768
  );

  console.log(context);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        setIsWiderThanTablet(true);
        return;
      }
      setIsWiderThanTablet(false);
    });
  }, [isWiderThanTablet]);

  const isShowAllForm = context.editingGroupId === "0";
  const showSingleGroup = () => {
    const hasResponsedGroup = context.groups.find(
      (group) => group.id === context.editingGroupId
    );
    if (!hasResponsedGroup) return context.groups[0];
    return hasResponsedGroup;
  };
  const groupListArray = isShowAllForm ? context.groups : [showSingleGroup()];

  return context.groups.length !== 0 ? (
    <>
      {groupListArray.map((group) => {
        const hasForms = context.forms && context.forms?.length > 0;
        const hasResponsedForms = hasForms
          ? context.forms.filter((form) => form.groupId === group.id)
          : [];
        const groupForms =
          hasResponsedForms.length > 0 ? hasResponsedForms : ["1"];

        return isWiderThanTablet ? (
          <ListContainer key={group.id}>
            <ListColumnTitleContainer>
              <GroupTagWrapper>
                <GroupTag>{group.name}</GroupTag>
              </GroupTagWrapper>
              <ResponsedQuantity>回應數量</ResponsedQuantity>
              <CreatedTime>創建日期</CreatedTime>
              <ResponsedTime>最新回應日期</ResponsedTime>
              <ExpandMore>更多</ExpandMore>
            </ListColumnTitleContainer>
            <FormWrapper>
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
                const dateCreated = helper.convertFirebaseTimeToDate(
                  (form as Forms).createdTime
                );
                const dateResponsed =
                  form.latestResponsedTime !== null
                    ? helper.convertFirebaseTimeToDate(form.latestResponsedTime)
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
        ) : (
          <CardContainer key={group.id}>
            <GroupTag>{group.name}</GroupTag>
            <FormWrapper>
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
                const dateCreated = helper.convertFirebaseTimeToDate(
                  (form as Forms).createdTime
                );
                const dateResponsed =
                  form.latestResponsedTime !== null
                    ? helper.convertFirebaseTimeToDate(form.latestResponsedTime)
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
  ) : (
    <></>
  );
};

export default FormList;
