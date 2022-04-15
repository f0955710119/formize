import { FC } from "react";
import useGenerateValidationHandler from "../../../../../../hooks/useGenerateValidationHandler";
import useGetQuestion from "../../../../../../hooks/useQuestion";

import type { Question } from "../../../../../../store/slice/questionSlice";
import RequiredSwitch from "./UI/RequiredSwitch";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";

import helper from "../../../../../../utils/helper";
import questionConfig from "../../../../../../utils/questionConfig";

interface DateLimitationProps {
  id: string;
}

const DateLimitation: FC<DateLimitationProps> = ({
  id,
}: DateLimitationProps) => {
  const question = useGetQuestion(id) as Question;
  const startDate = questionConfig.START_DATE;
  const endDate = questionConfig.END_DATE;

  const startDateValidationHandler = (value: string) => {
    if (question.validations.endDate === undefined) return null;
    const startDateReplace = helper.generateParseNumberTime(value);
    if (!question.validations.endDate) return null;
    const { endDate } = question.validations;
    const endDateReplace = helper.generateParseNumberTime(endDate, false);
    if (startDateReplace < endDateReplace) return null;
    return "起始日期不可以大於終點日期(但可同日)，請再選擇一次來修正";
  };

  const endDateValidationHandler = (value: string) => {
    if (question.validations.startDate === undefined) return null;
    const endDateReplace = helper.generateParseNumberTime(value, false);
    if (!question.validations.startDate) return null;
    const { startDate } = question.validations;
    const startDateReplace = helper.generateParseNumberTime(startDate);
    if (startDateReplace < endDateReplace) return null;
    return "終點日期不可以小於起始日期(但可同日)，請再選擇一次來修正";
  };
  // prettier-ignore
  const startDateHandler = useGenerateValidationHandler(id, startDate, false, question,startDateValidationHandler);
  // prettier-ignore
  const endDateHandler = useGenerateValidationHandler(id, endDate, false, question,endDateValidationHandler);

  return (
    <LimitationWrapper>
      <RequiredSwitch />
      {/* <Field>
        <Label>允許多日</Label>
        <Switch />
      </Field> */}
      <Field>
        <Label>起始日期</Label>
        <TextInput
          id={id}
          label="設定範圍起始"
          inputType="date"
          defaultValue={helper.generateDate()}
          validationType={questionConfig.DATE}
          dispatchHandler={startDateHandler}
        />
      </Field>
      <Field>
        <Label>結尾日期</Label>
        <TextInput
          id={id}
          label="設定範圍終點"
          inputType="date"
          defaultValue={helper.generateDate()}
          validationType={questionConfig.DATE}
          dispatchHandler={endDateHandler}
        />
      </Field>
    </LimitationWrapper>
  );
};

export default DateLimitation;
