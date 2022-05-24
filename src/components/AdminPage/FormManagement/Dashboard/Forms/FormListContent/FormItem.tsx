import { FC, useState } from "react";

import { KeyboardArrowDown } from "@styled-icons/material-rounded/KeyboardArrowDown";
import styled from "styled-components";

import helper from "../../../../../../utils/helper";
import FormItemExpand from "../FormItemExpand/FormItemExpand";

interface ItemContainerProps {
  isExpand: boolean;
}

const ItemContainer = styled.li<ItemContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid rgba(180, 188, 183, 0.15);
  background-color: #fdd87238;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 0.5rem;
  width: 100%;
  height: 5rem;
  color: #333;
  font-size: 1.4rem;
`;

const Title = styled.span`
  display: block;
  padding-left: 3rem;
  width: calc(100% - 36rem);
  font-size: 1.5rem;
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

interface ExpandMoreProps {
  hasClickExpand: boolean;
}

const ExpandMore = styled(KeyboardArrowDown)<ExpandMoreProps>`
  width: 2.2rem;
  height: 100%;
  fill: inherit;
  cursor: pointer;
  transform: ${(props) => `rotate(${props.hasClickExpand ? "180deg" : "0"})`};
  transition: transform 0.3s;
`;

interface FormItemProps {
  title: string;
  responsedTimes: number;
  dateCreated: Date;
  dateResponsed: Date | null;
  formId: string;
}

const FormItem: FC<FormItemProps> = ({
  title,
  responsedTimes,
  dateCreated,
  dateResponsed,
  formId,
}: FormItemProps) => {
  const [hasClickExpand, setHasClickExpand] = useState<boolean>(false);
  return (
    <ItemContainer isExpand={hasClickExpand}>
      <ItemWrapper>
        <Title>{title}</Title>
        <ResponsedQuantity>{responsedTimes}</ResponsedQuantity>
        <CreatedTime>{helper.convertDateToLocaleString(dateCreated)}</CreatedTime>
        <ResponsedTime>
          {dateResponsed ? helper.convertDateToLocaleString(dateResponsed) : "尚無回應"}
        </ResponsedTime>
        <ExpandMore
          onClick={() => setHasClickExpand((prevState) => !prevState)}
          hasClickExpand={hasClickExpand}
        ></ExpandMore>
      </ItemWrapper>
      <FormItemExpand isExpand={hasClickExpand} formId={formId} />
    </ItemContainer>
  );
};

export default FormItem;
