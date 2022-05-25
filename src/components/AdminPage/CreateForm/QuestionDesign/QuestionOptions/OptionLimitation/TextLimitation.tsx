import { FC } from "react";

import questionConfig from "../../../../../../configs/questionConfig";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";
import useGetQuestion from "../../../../../../hooks/useGetQuestion";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import { Question } from "../../../../../../types/question";
import sweetAlert from "../../../../../../utils/sweetAlert";
import Field from "./UI/Field";
import Label from "./UI/Label";
import LimitationWrapper from "./UI/LimitationWrapper";
import RequiredSwitch from "./UI/RequiredSwitch";
import TextInput from "./UI/TextInput";

interface TextLimitationProps {
  id: string;
}

const TextLimitation: FC<TextLimitationProps> = ({ id }: TextLimitationProps) => {
  const dispatch = useAppDispatch();
  const question = useGetQuestion(id) as Question;
  const numberRegex = /^[0-9]+$/;
  const saveMaxLengthHandler = (value: string) => {
    if (value === "") {
      sweetAlert.errorReminderAlert("字數上限不可空白!");
      return;
    }

    if (!numberRegex.test(value)) {
      const errorMessage = +value <= 0 ? "字數上限只能是正整數!" : "字數上限只能是數值";
      sweetAlert.errorReminderAlert(errorMessage);
      return;
    }

    if (question.type === "0" && +value > 100) {
      sweetAlert.errorReminderAlert("該題的字數上限為100字");
      return;
    }
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.VALIDATIONS,
        validations: { ...question.validations, length: +value },
      })
    );
  };
  return (
    <LimitationWrapper>
      <RequiredSwitch id={id} />
      <Field>
        <Label>字數上限</Label>
        <TextInput
          id={id}
          dispatchHandler={saveMaxLengthHandler}
          validationType={questionConfig.LENGTH}
        />
      </Field>
    </LimitationWrapper>
  );
};

export default TextLimitation;
