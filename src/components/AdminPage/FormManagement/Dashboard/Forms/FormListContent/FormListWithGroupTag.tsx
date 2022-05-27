import { FC } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../../../../configs/breakpointConfig";
import { Forms } from "../../../../../../types/form";
import { Group } from "../../../../../../types/group";
import FormsInGroup from "./FormsInGroup";
import GroupListColumn from "./GroupListColumn";

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

const CardContainer = styled(FormsContainer)`
  display: none;
  @media ${breakpointConfig.tablet} {
    display: block;
  } ;
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

const generateGroupList = (forms: Forms[], groupId: string) => {
  const hasForms = forms && forms?.length > 0;
  const hasResponsedForms = hasForms ? forms.filter((form) => form.groupId === groupId) : [];
  return hasResponsedForms.length > 0 ? hasResponsedForms : ["1"];
};

interface FormListWithGroupTagProps {
  group: Group;
  forms: Forms[];
  isForDesktop: boolean;
}

const FormListWithGroupTag: FC<FormListWithGroupTagProps> = (props) => {
  const { group, forms, isForDesktop } = props;
  const { id, name } = group;
  const Container = isForDesktop ? ListContainer : CardContainer;
  const groupForms = generateGroupList(forms, id);
  return (
    <Container key={id}>
      {isForDesktop ? <GroupListColumn name={name} /> : <GroupTag>{name}</GroupTag>}
      <FormWrapper>
        {groupForms.map((form) => {
          const isEmptyGroup = form === "1" || typeof form === "string";
          return isEmptyGroup ? (
            <EmptyListContainer>
              <EmptyListContainerText>此群組還沒有問卷唷</EmptyListContainerText>
            </EmptyListContainer>
          ) : (
            <FormsInGroup key={form.id} form={form} isList={isForDesktop} />
          );
        })}
      </FormWrapper>
    </Container>
  );
};

export default FormListWithGroupTag;
