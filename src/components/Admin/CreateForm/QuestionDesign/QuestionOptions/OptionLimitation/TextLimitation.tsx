import { FC } from "react";
import RequiredSwitch from "./UI/RequiredSwitch";
import ComboBox from "./UI/ComboBox";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";
import {
  questionActions,
  Validation,
} from "../../../../../../store/slice/questionSlice";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import questionConfig from "../../../../../../utils/questionConfig";

interface TextLimitationProps {
  id: string;
  validations: Validation;
}

const TextLimitation: FC<TextLimitationProps> = ({
  id,
  validations,
}: TextLimitationProps) => {
  const dispatch = useAppDispatch();
  const saveMaxLengthHandler = (value: string) => {
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.VALIDATIONS,
        validations: { ...validations, length: +value },
      })
    );
  };
  return (
    <LimitationWrapper>
      <RequiredSwitch />
      <Field>
        <Label>驗證</Label>
        {validations.textType && <ComboBox options={validations.textType} />}
      </Field>
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
