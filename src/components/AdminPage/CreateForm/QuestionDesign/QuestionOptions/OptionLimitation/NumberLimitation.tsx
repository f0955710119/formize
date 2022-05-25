import { FC } from "react";

import questionConfig from "../../../../../../configs/questionConfig";
import useUpdateQuestionValidation from "../../../../../../hooks/useUpdateQuestionValidation";
import useGetQuestion from "../../../../../../hooks/useGetQuestion";
import type { Question } from "../../../../../../types/question";
import type { Validation } from "../../../../../../types/validation";
import Field from "./UI/Field";
import Label from "./UI/Label";
import LimitationWrapper from "./UI/LimitationWrapper";
import RequiredSwitch from "./UI/RequiredSwitch";
import TextInput from "./UI/TextInput";

interface NumberLimitationProps {
  id: string;
  validations: Validation;
}

const checkInt = ({ max, min, value }: { max: number; min: number; value: string }) => {
  const isInt = Number.isInteger((+max - +min) / +value);
  console.log(+value);
  if (isInt) return null;
  return "每次能移動的數值區間必須符合設定的最大值和最小值，得符合「最大值 - 最小值」 / 「區間」能整除!";
};

const NumberLimitation: FC<NumberLimitationProps> = ({ id }: NumberLimitationProps) => {
  const question = useGetQuestion(id) as Question;
  const { min, max, unit, interval } = question.validations;
  const minValidationHandler = (value: string) => {
    if (max === undefined || min === undefined) return null;
    if (+value > max) return "最小值不可以超過最大值，請更換數值";
    return checkInt({ max, min, value: "" + interval });
  };

  const maxValidationHandler = (value: string) => {
    if (min === undefined || max === undefined) return null;
    if (+value < min) return "最大值不可以小於最大值，請更換數值";
    return checkInt({ max, min, value: "" + interval });
  };

  const unitValidationHandler = (value: string) => {
    if (!unit) return null;
    const chineseRegex = /^[a-zA-Z\u4e00-\u9fa5]+$/;
    if (chineseRegex.test(value)) return null;
    return "請填寫正確的中、英文單位詞";
  };

  const intervalValidationHandler = (value: string) => {
    if (interval === undefined || max === undefined || min === undefined) return null;
    if (+value === 0 || +value < 0) return "移動區間值要至少大於0喲";
    return checkInt({ max, min, value });
  };

  const saveMinHandler = useUpdateQuestionValidation(
    id,
    questionConfig.MIN,
    true,
    question,
    minValidationHandler
  );
  const saveMaxHandler = useUpdateQuestionValidation(
    id,
    questionConfig.MAX,
    true,
    question,
    maxValidationHandler
  );
  const saveUnitHandler = useUpdateQuestionValidation(
    id,
    questionConfig.UNIT,
    false,
    question,
    unitValidationHandler
  );
  const saveIntervalHandler = useUpdateQuestionValidation(
    id,
    questionConfig.INTERVAL,
    true,
    question,
    intervalValidationHandler
  );

  return (
    <LimitationWrapper>
      <RequiredSwitch id={id} />
      <Field>
        <Label>最小值</Label>
        <TextInput
          id={id}
          inputType="number"
          dispatchHandler={saveMinHandler}
          validationType={questionConfig.MIN}
        />
      </Field>
      <Field>
        <Label>最大值</Label>
        <TextInput
          id={id}
          inputType="number"
          dispatchHandler={saveMaxHandler}
          validationType={questionConfig.MAX}
        />
      </Field>
      <Field>
        <Label>單位</Label>
        <TextInput
          id={id}
          placeholder="如:年、月、小時"
          dispatchHandler={saveUnitHandler}
          validationType={questionConfig.UNIT}
        />
      </Field>
      {question.type === questionConfig.SLIDER && (
        <Field>
          <Label>間隔</Label>
          <TextInput
            id={id}
            placeholder="無則留空"
            inputType="number"
            dispatchHandler={saveIntervalHandler}
            validationType={questionConfig.INTERVAL}
          />
        </Field>
      )}
    </LimitationWrapper>
  );
};

export default NumberLimitation;
