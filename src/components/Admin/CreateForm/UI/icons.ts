import { Delete } from "@styled-icons/material/Delete";
import { Text } from "@styled-icons/fluentui-system-filled/Text";
import { CardText } from "@styled-icons/bootstrap/CardText";
import { TooltipQuote } from "@styled-icons/fluentui-system-filled/TooltipQuote";
import { Check2Circle } from "@styled-icons/bootstrap/Check2Circle";
// import { TaskListSquareLtr } from "@styled-icons/fluentui-system-filled/TaskListSquareLtr";
import { CardChecklist } from "@styled-icons/bootstrap/CardChecklist";
import { TableFreezeColumnAndRow } from "@styled-icons/fluentui-system-filled/TableFreezeColumnAndRow";
import { NumberRow } from "@styled-icons/fluentui-system-regular/NumberRow";
import { SliderAlt } from "@styled-icons/boxicons-regular/SliderAlt";
import { TextSortAscending } from "@styled-icons/fluentui-system-regular/TextSortAscending";
import { DateRange } from "@styled-icons/material/DateRange";

const icons: { [key: string]: any } = {
  delete: Delete,
  oneLineText: Text,
  multipleLineText: CardText,
  introduction: TooltipQuote,
  oneChoice: Check2Circle,
  multipleChoice: CardChecklist,
  matrix: TableFreezeColumnAndRow,
  number: NumberRow,
  slider: SliderAlt,
  sort: TextSortAscending,
  date: DateRange,
};

export const questionIconList = [
  icons.oneLineText,
  icons.multipleLineText,
  icons.introduction,
  icons.oneChoice,
  icons.multipleChoice,
  icons.matrix,
  icons.number,
  icons.slider,
  icons.sort,
  icons.date,
];

export default icons;
