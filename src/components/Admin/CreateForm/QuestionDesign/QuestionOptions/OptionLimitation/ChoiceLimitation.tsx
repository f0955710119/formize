import { FC } from "react";
import RequiredSwitch from "./UI/RequiredSwitch";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";

const ChoiceLimitation: FC = () => {
  return (
    <LimitationWrapper>
      <RequiredSwitch />
      <Field>
        <Label>選填數量</Label>
        <TextInput />
      </Field>
    </LimitationWrapper>
  );
};

export default ChoiceLimitation;
