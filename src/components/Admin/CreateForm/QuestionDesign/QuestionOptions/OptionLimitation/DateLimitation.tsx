import { FC } from "react";
import { Switch } from "@mui/material";

import RequiredSwitch from "./UI/RequiredSwitch";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";

const DateLimitation: FC = () => {
  return (
    <LimitationWrapper>
      <RequiredSwitch />
      <Field>
        <Label>允許多日</Label>
        <Switch />
      </Field>
      <Field>
        <Label>起始日期</Label>
        <TextInput
          label="設定範圍起始"
          inputType="date"
          defaultValue="2022-04-12"
        />
      </Field>
      <Field>
        <Label>結尾日期</Label>
        <TextInput
          label="設定範圍終點"
          inputType="date"
          defaultValue="2022-04-12"
        />
      </Field>
    </LimitationWrapper>
  );
};

export default DateLimitation;
