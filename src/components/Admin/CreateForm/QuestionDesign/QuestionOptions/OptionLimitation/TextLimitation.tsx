import { FC } from "react";
import RequiredSwitch from "./UI/RequiredSwitch";
import ComboBox from "./UI/ComboBox";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";

const TextLimitation: FC = () => {
  return (
    <LimitationWrapper>
      <RequiredSwitch />
      <Field>
        <Label>驗證</Label>
        <ComboBox options={["文字", "信箱", "手機"]} />
      </Field>
      <Field>
        <Label>字數上限</Label>
        <TextInput />
      </Field>
    </LimitationWrapper>
  );
};

export default TextLimitation;
