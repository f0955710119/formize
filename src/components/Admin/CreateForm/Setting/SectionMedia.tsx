import { FC } from "react";

import SectionWrapper from "../UI/Section";
import SectionHeading from "../UI/SectionHeading";
import Field from "../UI/Field";
import Label from "../UI/Label";
import Input from "../UI/Input";

const SectionMedia: FC = () => {
  return (
    <SectionWrapper>
      <SectionHeading>媒體設定</SectionHeading>
      <Field>
        <Label>雲端連結</Label>
        <Input value="待開放功能" required disabled />
      </Field>
    </SectionWrapper>
  );
};

export default SectionMedia;
