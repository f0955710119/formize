import { FC } from "react";
import { Switch } from "@mui/material";
import Field from "./Field";
import Label from "./Label";

const RequiredSwitch: FC = () => {
  return (
    <Field>
      <Label>必填</Label>
      <Switch />
    </Field>
  );
};

export default RequiredSwitch;
