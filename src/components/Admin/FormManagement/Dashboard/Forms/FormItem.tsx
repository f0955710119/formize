import { FC, useState } from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormOptionList from "./FormOptionList";
import FormItemExpand from "./FormItemExpand/FormItemExpand";

interface ItemContainerProps {
  isExpand: boolean;
}

const ItemContainer = styled.li<ItemContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid rgba(180, 188, 183, 0.15);
  background-color: rgba(180, 188, 183, 0.2);
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.5rem 0 0 3rem;
  width: 100%;
  height: 5rem;
  color: #333;
  font-size: 1.4rem;
`;

const Title = styled.span`
  display: block;
  width: 71.3%;
  font-size: 1.6rem;
`;

const ResponseNumber = styled.span`
  width: 4.7%;
`;

const Date = styled.span`
  font-size: 1.4rem;
  width: 10%;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3%;
  height: 100%;
`;

interface FormItemProps {
  title: string;
  responseNumber: number;
  date: Date;
  formId: string;
}

const FormItem: FC<FormItemProps> = ({
  title,
  responseNumber,
  date,
  formId,
}: FormItemProps) => {
  const [hasClickExpand, setHasClickExpand] = useState<boolean>(false);
  return (
    <ItemContainer isExpand={hasClickExpand}>
      <ItemWrapper>
        <Title>{title}</Title>
        <ResponseNumber>{responseNumber}</ResponseNumber>
        <Date>
          {date.toLocaleString("zh-tw", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Date>
        <Date>
          {date.toLocaleString("zh-tw", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Date>
        <IconWrapper
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
        </IconWrapper>
      </ItemWrapper>
      <FormItemExpand isExpand={hasClickExpand} formId={formId} />
    </ItemContainer>
  );
};

export default FormItem;
