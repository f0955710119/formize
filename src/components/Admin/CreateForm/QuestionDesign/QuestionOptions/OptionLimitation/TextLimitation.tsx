import { FC } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import questionConfig from "../../../../../../utils/questionConfig";
import useGetQuestion from "../../../../../../hooks/useQuestion";

import { Question } from "../../../../../../types/question";
import { questionActions } from "../../../../../../store/slice/questionSlice";

import RequiredSwitch from "./UI/RequiredSwitch";
import ComboBox from "./UI/ComboBox";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";

interface TextLimitationProps {
  id: string;
}

const TextLimitation: FC<TextLimitationProps> = ({
  id,
}: TextLimitationProps) => {
  const dispatch = useAppDispatch();
  const question = useGetQuestion(id) as Question;
  const saveMaxLengthHandler = (value: string) => {
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
      <RequiredSwitch />
      {question.type !== "2" && (
        <Field>
          <Label>驗證</Label>
          {question.validations.textType && (
            <ComboBox options={question.validations.textType} />
          )}
        </Field>
      )}

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
