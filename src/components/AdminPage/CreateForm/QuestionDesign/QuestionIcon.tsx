import { FC } from "react";

import { CardChecklist } from "@styled-icons/bootstrap/CardChecklist";
import { CardText } from "@styled-icons/bootstrap/CardText";
import { Check2Circle } from "@styled-icons/bootstrap/Check2Circle";
import { SliderAlt } from "@styled-icons/boxicons-regular/SliderAlt";
import { TableFreezeColumnAndRow } from "@styled-icons/fluentui-system-filled/TableFreezeColumnAndRow";
import { Text } from "@styled-icons/fluentui-system-filled/Text";
import { TooltipQuote } from "@styled-icons/fluentui-system-filled/TooltipQuote";
import { NumberRow } from "@styled-icons/fluentui-system-regular/NumberRow";
import { TextSortAscending } from "@styled-icons/fluentui-system-regular/TextSortAscending";
import { DateRange } from "@styled-icons/material/DateRange";
import styled from "styled-components";

interface Icon {
  customStyle: string;
}

const iconStyle = `
  width: 1.8rem;
  height: 1.8rem;
  fill:#aaa;
  transform: translateY(-0.2rem);
  marginRight: 0.3rem;
`;

const TextIcon = styled(Text)<Icon>`
  ${iconStyle}
  ${(props) => props.customStyle}
`;

const CardTextIcon = styled(CardText)<Icon>`
  ${iconStyle}
  ${(props) => props.customStyle}
`;

const TooltipQuoteIcon = styled(TooltipQuote)<Icon>`
  ${iconStyle}
  ${(props) => props.customStyle}
`;

const Check2CircleIcon = styled(Check2Circle)<Icon>`
  ${iconStyle}
  ${(props) => props.customStyle}
`;

const CardChecklistIcon = styled(CardChecklist)<Icon>`
  ${iconStyle}
  ${(props) => props.customStyle}
`;

const TableFreezeColumnAndRowIcon = styled(TableFreezeColumnAndRow)<Icon>`
  ${iconStyle}
  ${(props) => props.customStyle}
`;

const NumberRowIcon = styled(NumberRow)<Icon>`
  ${iconStyle}
  ${(props) => props.customStyle}
`;
const SliderAltIcon = styled(SliderAlt)<Icon>`
  ${iconStyle}
  ${(props) => props.customStyle}
`;
const TextSortAscendingIcon = styled(TextSortAscending)<Icon>`
  ${iconStyle}
  ${(props) => props.customStyle}
`;
const DateRangeIcon = styled(DateRange)<Icon>`
  ${iconStyle}
  ${(props) => props.customStyle}
`;

interface IconProps {
  type: string;
  style?: string;
}

const QuestionIcon: FC<IconProps> = ({ type, style }) => {
  const incomingStyle = style ? style : "";
  switch (type) {
    case "0": {
      return <TextIcon customStyle={incomingStyle} />;
    }

    case "1": {
      return <CardTextIcon customStyle={incomingStyle} />;
    }

    case "2": {
      return <TooltipQuoteIcon customStyle={incomingStyle} />;
    }
    case "3": {
      return <Check2CircleIcon customStyle={incomingStyle} />;
    }
    case "4": {
      return <CardChecklistIcon customStyle={incomingStyle} />;
    }
    case "5": {
      return <TableFreezeColumnAndRowIcon customStyle={incomingStyle} />;
    }
    case "6": {
      return <NumberRowIcon customStyle={incomingStyle} />;
    }
    case "7": {
      return <SliderAltIcon customStyle={incomingStyle} />;
    }
    case "8": {
      return <TextSortAscendingIcon customStyle={incomingStyle} />;
    }
    case "9": {
      return <DateRangeIcon customStyle={incomingStyle} />;
    }

    default: {
      return <></>;
    }
  }
};

export default QuestionIcon;
