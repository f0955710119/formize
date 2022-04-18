import { FC } from "react";

import type { Question } from "../../../../../../types/question";
import type { Validation } from "../../../../../../types/validation";

import useGetQuestion from "../../../../../../hooks/useQuestion";
import useGenerateValidationHandler from "../../../../../../hooks/useGenerateValidationHandler";

import RequiredSwitch from "./UI/RequiredSwitch";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";

import questionConfig from "../../../../../../utils/questionConfig";

interface NumberLimitationProps {
  id: string;
  validations: Validation;
}

const NumberLimitation: FC<NumberLimitationProps> = ({
  id,
}: NumberLimitationProps) => {
  const question = useGetQuestion(id) as Question;
  const { min, max, unit, decimal, interval } = question.validations;
  const minValidationHandler = (value: string) => {
    if (max === undefined) return null;
    if (+value < max) return null;
    return "最小值不可以超過最大值，請更換數值";
  };

  const maxValidationHandler = (value: string) => {
    if (min === undefined) return null;
    if (+value > min) return null;
    return "最大值不可以小於最大值，請更換數值";
  };

  const unitValidationHandler = (value: string) => {
    if (!unit) return null;
    const chineseRegex = /^[a-zA-Z\u4e00-\u9fa5]+$/;
    if (chineseRegex.test(value)) return null;
    return "請填寫正確的中、英文單位詞";
  };

  const intervalValidationHandler = (value: string) => {
    if (interval === undefined || max === undefined || min === undefined)
      return null;
    if (+value === 0 || +value < 0) return "移動區間值要至少大於0喲";
    const isInt = Number.isInteger((max - min + 1) / +value);
    if (isInt) return null;
    return "每次能移動的數值區間必須符合設定的最大值和最小值，得符合「最大值 - 最小值 + 1」!";
  };

  const decialValidationHanlder = (value: string) => {
    if (!decimal) return null;
    if (+value > 4) return "目前僅開放最多小數點後4位，請重新設定!";
    if (!Number.isInteger(+value)) return "只能輸入整數喲!";
    return null;
  };
  const saveMinHandler = useGenerateValidationHandler(
    id,
    questionConfig.MIN,
    true,
    question,
    minValidationHandler
  );
  const saveMaxHandler = useGenerateValidationHandler(
    id,
    questionConfig.MAX,
    true,
    question,
    maxValidationHandler
  );
  const saveUnitHandler = useGenerateValidationHandler(
    id,
    questionConfig.UNIT,
    false,
    question,
    unitValidationHandler
  );
  const saveIntervalHandler = useGenerateValidationHandler(
    id,
    questionConfig.INTERVAL,
    true,
    question,
    intervalValidationHandler
  );
  const saveDemcialHandler = useGenerateValidationHandler(
    id,
    questionConfig.DECIMAL,
    true,
    question,
    decialValidationHanlder
  );

  return (
    <LimitationWrapper>
      <RequiredSwitch />
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
      <Field>
        <Label>小數點後碼數</Label>
        <TextInput
          id={id}
          placeholder="無則留空"
          inputType="number"
          dispatchHandler={saveDemcialHandler}
          validationType={questionConfig.DECIMAL}
        />
      </Field>
    </LimitationWrapper>
  );
};

export default NumberLimitation;
