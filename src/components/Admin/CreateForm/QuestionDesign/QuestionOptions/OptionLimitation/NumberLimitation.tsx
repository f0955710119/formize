import { FC } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import RequiredSwitch from "./UI/RequiredSwitch";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";
import {
  Question,
  questionActions,
  Validation,
} from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import questionConfig from "../../../../../../utils/questionConfig";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import useGetQuestion from "../../../../../../hooks/useQuestion";
import helper from "../../../../../../utils/helper";
import useGenerateValidationHandler from "../../../../../../hooks/useGenerateValidationHandler";

interface NumberLimitationProps {
  id: string;
  validations: Validation;
}

const NumberLimitation: FC<NumberLimitationProps> = ({
  id,
}: NumberLimitationProps) => {
  const question = useGetQuestion(id) as Question;
  const { min, max, unit, interval, decimal } = question.validations;

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

  const inputKeys = [
    // prettier-ignore
    { key: questionConfig.MIN, validationHandler: minValidationHandler },
    // prettier-ignore
    { key: questionConfig.MAX, validationHandler: maxValidationHandler },
    { key: questionConfig.UNIT, validationHandler: unitValidationHandler },
    // prettier-ignore
    { key: questionConfig.INTERVAL, validationHandler: intervalValidationHandler },
    { key: questionConfig.DECIMAL, validationHandler: decialValidationHanlder },
  ];
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
  // const saveInputHandlerArray = inputKeys.map((input) => {
  //   if (input.key === questionConfig.UNIT)
  //     return helper.generateHandler(input.key, input.validationHandler, false);
  //   return helper.generateHandler(input.key, input.validationHandler);
  // });

  // const [
  //   saveMinHandler,
  //   saveMaxHandler,
  //   saveUnitHandler,
  //   saveIntervalHandler,
  //   saveDemcialHandler,
  // ] = saveInputHandlerArray;

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
