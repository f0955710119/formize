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

const iconConfig: { [key: string]: any } = {
  "0": Text,
  "1": CardText,
  "2": TooltipQuote,
  "3": Check2Circle,
  "4": CardChecklist,
  "5": TableFreezeColumnAndRow,
  "6": NumberRow,
  "7": SliderAlt,
  "8": TextSortAscending,
  "9": DateRange,
};

interface IconProps {
  type: string;
  className?: string;
}

const QuestionIcon: FC<IconProps> = ({ type, className }) => {
  const Icon = iconConfig[type];
  return <Icon className={className} />;
};

export default QuestionIcon;
