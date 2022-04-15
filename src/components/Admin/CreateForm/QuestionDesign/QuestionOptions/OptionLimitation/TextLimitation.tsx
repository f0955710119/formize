import { FC } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import RequiredSwitch from "./UI/RequiredSwitch";
import ComboBox from "./UI/ComboBox";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";
import type { Validation } from "../../../../../../store/slice/questionSlice";
import questionConfig from "../../../../../../utils/questionConfig";

interface TextLimitationProps {
  validations: Validation;
}

const TextLimitation: FC<TextLimitationProps> = ({
  validations,
}: TextLimitationProps) => {
  const dispatch = useAppDispatch();

  
  return (
    <LimitationWrapper>
      <RequiredSwitch />
      <Field>
        <Label>驗證</Label>

        {validations.textType && <ComboBox options={validations.textType} />}
      </Field>
      <Field>
        <Label>字數上限</Label>
        <TextInput />
      </Field>
    </LimitationWrapper>
  );
};

export default TextLimitation;
