import { Delete } from "@styled-icons/material/Delete";
import { Text } from "@styled-icons/fluentui-system-filled/Text";
import { SlideText } from "@styled-icons/fluentui-system-filled/SlideText";
import { TooltipQuote } from "@styled-icons/fluentui-system-filled/TooltipQuote";
import { DotCircle } from "@styled-icons/fa-regular/DotCircle";
import { TaskListSquareLtr } from "@styled-icons/fluentui-system-filled/TaskListSquareLtr";
import { TableFreezeColumnAndRow } from "@styled-icons/fluentui-system-filled/TableFreezeColumnAndRow";
import { NumberRow } from "@styled-icons/fluentui-system-regular/NumberRow";
import { SliderAlt } from "@styled-icons/boxicons-regular/SliderAlt";
import { TextSortAscending } from "@styled-icons/fluentui-system-regular/TextSortAscending";
import { DateRange } from "@styled-icons/material/DateRange";

const icons: { [key: string]: any } = {
  delete: Delete,
  oneLineText: Text,
  multipleLineText: SlideText,
  introduction: TooltipQuote,
  oneChoice: DotCircle,
  multipleChoice: TaskListSquareLtr,
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
