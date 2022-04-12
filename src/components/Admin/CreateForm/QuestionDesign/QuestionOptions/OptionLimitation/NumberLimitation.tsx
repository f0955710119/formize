import { FC } from "react";
import RequiredSwitch from "./UI/RequiredSwitch";
import ComboBox from "./UI/ComboBox";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";

const NumberLimitation: FC = () => {
  return (
    <LimitationWrapper>
      <RequiredSwitch />
      <Field>
        <Label>最小值</Label>
        <TextInput />
      </Field>
      <Field>
        <Label>最大值</Label>
        <TextInput />
      </Field>
      <Field>
        <Label>單位</Label>
        <TextInput placeholder="如:年、月、小時等都可以..." />
      </Field>
      <Field>
        <Label>間隔</Label>
        <TextInput placeholder="若無則留白即可" />
      </Field>
      <Field>
        <Label>小數點後碼數</Label>
        <TextInput placeholder="若無則留白即可" />
      </Field>
    </LimitationWrapper>
  );
};

export default NumberLimitation;
