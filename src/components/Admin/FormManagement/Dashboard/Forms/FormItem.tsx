import { FC, useState } from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormOptionList from "./FormOptionList";
import FormItemExpand from "./FormItemExpand/FormItemExpand";
import helper from "../../../../../utils/helper";

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

const ExpandMore = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.5rem;
  height: 100%;
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
        <CreatedTime>
          {helper.convertDateToLocaleString(dateCreated)}
        </CreatedTime>
        <ResponsedTime>
          {dateResponsed
            ? helper.convertDateToLocaleString(dateResponsed)
            : "尚無回應"}
        </ResponsedTime>
        <ExpandMore
          onClick={() => setHasClickExpand((prevState) => !prevState)}
        >
          <ExpandMoreIcon
            sx={{
              width: "55%",
              height: "100%",
              cursor: "pointer",
              transform: `rotate(${hasClickExpand ? "180deg" : "0"})`,
              transition: "transform 0.3s",
            }}
          />
        </ExpandMore>
      </ItemWrapper>
      <FormItemExpand isExpand={hasClickExpand} formId={formId} />
    </ItemContainer>
  );
};

export default FormItem;
