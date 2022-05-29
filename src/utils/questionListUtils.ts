import { Question } from "../types/question";

type StringValidation = string | undefined;
type NumericValidation = number | undefined;
type DateValidation = string | null | undefined;

interface NumericCombinationTextValidation {
  max: NumericValidation;
  min: NumericValidation;
  unit: StringValidation;
}

interface DateCombinationTextValidation {
  startDate: DateValidation;
  endDate: DateValidation;
  maxSelectedDateQuantity: number | null | undefined;
}

const filterOutEmptyText = (arr: string[]) => arr.filter((text) => text !== "");

const createCombinationDisplayText = (displayTextList: string[]) => {
  if (displayTextList.length === 0) return "";
  if (displayTextList.length === 1) return displayTextList.join("");
  return displayTextList.join("\t/\t");
};

const createCombinationText = (rawDisplayTextList: string[]) => {
  const displayTextList = filterOutEmptyText(rawDisplayTextList);
  return createCombinationDisplayText(displayTextList);
};

const createSimpleCombinationText = (
  condition: string | number | undefined,
  requiredText: string,
  conditionText: string
) => {
  const hasConditionText = condition ? conditionText : "";
  const rawDisplayTextList = [requiredText, hasConditionText];
  return createCombinationText(rawDisplayTextList);
};

const createNumericRawTextList = (validations: NumericCombinationTextValidation) => {
  const { max, min, unit } = validations;
  const hasMax = max !== undefined ? `最大值為${max}` : "";
  const hasMin = min !== undefined ? `最小值為${min}` : "";
  const hasUnit = unit ? `單位為${unit}` : "";
  return [hasMax, hasMin, hasUnit];
};

const createDateRawTextList = (validations: DateCombinationTextValidation) => {
  const { startDate, endDate, maxSelectedDateQuantity } = validations;
  const hasStartDate = startDate ? `範圍為${startDate}至` : "";
  const hasEndDate = endDate ? endDate : "";
  const dateRange = hasStartDate + hasEndDate;
  const hasMaxSelectedDateQuantity = maxSelectedDateQuantity
    ? `最多選擇${maxSelectedDateQuantity}日`
    : "";
  return [dateRange, hasMaxSelectedDateQuantity];
};

const createMultipleCombinationText = (
  validations: NumericCombinationTextValidation | DateCombinationTextValidation,
  requiredText: string,
  multipleType: string
) => {
  const multipleTypeConfig: { [key: string]: string[] } = {
    numeric: createNumericRawTextList(validations as NumericCombinationTextValidation),
    date: createDateRawTextList(validations as DateCombinationTextValidation),
  };
  const rawDisplayTextListWithoutRequiredText = multipleTypeConfig[multipleType];
  const rawDisplayTextList = [requiredText, ...rawDisplayTextListWithoutRequiredText];
  return createCombinationText(rawDisplayTextList);
};

export const generateQuestionLimitationTagText = (question: Question) => {
  const { type } = question;
  // prettier-ignore
  const { length, maxSelected, max, min, unit, startDate, endDate, maxSelectedDateQuantity } = question.validations;
  const hasRequired = question.validations.required ? "必填" : "";
  const requiredText = hasRequired !== "" ? `${hasRequired}` : "";

  const limitationTagForText = createSimpleCombinationText(
    length,
    requiredText,
    `字數上限為${length}字`
  );

  const limitationTagForChoice = createSimpleCombinationText(
    maxSelected,
    requiredText,
    `選擇上限為${maxSelected}個`
  );

  const limitationTagForNumber = createMultipleCombinationText(
    { max, min, unit },
    requiredText,
    "numeric"
  );

  const limitationTagForDate = createMultipleCombinationText(
    { startDate, endDate, maxSelectedDateQuantity },
    requiredText,
    "date"
  );

  const tagConfig: { [key: string]: string } = {
    "0": limitationTagForText,
    "1": limitationTagForText,
    "4": limitationTagForChoice,
    "6": limitationTagForNumber,
    "7": limitationTagForNumber,
    "8": limitationTagForChoice,
    "9": limitationTagForDate,
  };

  return tagConfig[type] ? tagConfig[type] : hasRequired;
};
