import { FC } from "react";
import useGetQuestion from "../../../../../../hooks/useQuestion";
import useGenerateValidationHandler from "../../../../../../hooks/useGenerateValidationHandler";
import RequiredSwitch from "./UI/RequiredSwitch";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";

import questionConfig from "../../../../../../utils/questionConfig";
import { Question } from "../../../../../../types/question";

interface ChoiceLimitationProps {
  id: string;
}

const ChoiceLimitation: FC<ChoiceLimitationProps> = ({
  id,
}: ChoiceLimitationProps) => {
  const question = useGetQuestion(id) as Question;
  const maxSelectedValidationHandler = (value: string) => {
    if (+value < 0) return "不可輸入0或0以下的數值";
    if (!Number.isInteger(+value)) return "上限數量只能輸入整數喲";
    if (!question?.options) return "當前沒有選項，請新增至少一項";
    console.log(question?.options);
    if (+value <= question?.options?.length) return null;
    return "選擇上限數量不可超過選項總數量，請再輸入一次";
  };

  const saveMaxSelectedHandler = useGenerateValidationHandler(
    id,
    questionConfig.MAX_SELECTED,
    true,
    question,
    maxSelectedValidationHandler
  );
  return (
    <LimitationWrapper>
      <RequiredSwitch id={id} />
      {question.type !== "3" && (
        <Field>
          <Label>選填數量</Label>
          <TextInput
            id={id}
            validationType={questionConfig.MAX_SELECTED}
            dispatchHandler={saveMaxSelectedHandler}
          />
        </Field>
      )}
    </LimitationWrapper>
  );
};

export default ChoiceLimitation;
