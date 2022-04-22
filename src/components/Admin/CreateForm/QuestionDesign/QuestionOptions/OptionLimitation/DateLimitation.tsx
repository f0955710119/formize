import { FC } from "react";
import useGenerateValidationHandler from "../../../../../../hooks/useGenerateValidationHandler";
import useGetQuestion from "../../../../../../hooks/useQuestion";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";

import type { Question } from "../../../../../../types/question";

import { Switch } from "@mui/material";
import RequiredSwitch from "./UI/RequiredSwitch";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";

import helper from "../../../../../../utils/helper";
import questionConfig from "../../../../../../configs/questionConfig";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
interface DateLimitationProps {
  id: string;
}

const DateLimitation: FC<DateLimitationProps> = ({
  id,
}: DateLimitationProps) => {
  const question = useGetQuestion(id) as Question;
  const dispatch = useAppDispatch();
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
      <RequiredSwitch id={id} />
      <Field>
        <Label>允許多日</Label>
        <Switch
          checked={question.validations.multipleDate}
          onChange={(event) => {
            const { checked } = event.target;
            dispatch(
              questionActions.updateSiglePropOfQuestion({
                id: question.id,
                actionType: questionActionType.VALIDATIONS,
                validations: {
                  ...question.validations,
                  multipleDate: checked,
                },
              })
            );
          }}
        />
      </Field>
      <Field>
        <Label>設定範圍</Label>
        <Switch
          checked={question.validations.hasRange}
          onChange={(event) => {
            const { checked } = event.target;
            dispatch(
              questionActions.updateSiglePropOfQuestion({
                id: question.id,
                actionType: questionActionType.VALIDATIONS,
                validations: {
                  ...question.validations,
                  hasRange: checked,
                },
              })
            );
          }}
        />
      </Field>
      {question.validations.hasRange && (
        <>
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
              defaultValue={helper.generateDate(false)}
              validationType={questionConfig.DATE}
              dispatchHandler={endDateHandler}
            />
          </Field>
        </>
      )}
    </LimitationWrapper>
  );
};

export default DateLimitation;
