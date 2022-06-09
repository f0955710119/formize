import { FC, ChangeEvent, useContext } from "react";

import settingActionType from "../../../../store/actionType/settingActionType";
import { settingContext } from "../../../../store/context/settingContext";
import Field from "../UI/Field";
import Label from "../UI/Label";
import SectionWrapper from "../UI/Section";
import SectionHeading from "../UI/SectionHeading";
import ModeSelect from "./SectionNormal/ModeSelect";
import NormalTextInput from "./SectionNormal/NormalTextInput";

const SectionNormal: FC = () => {
  const settingContextData = useContext(settingContext);
  const { title, setField } = settingContextData;

  return (
    <>
      <SectionWrapper>
        <SectionHeading>一般設定</SectionHeading>
        <Field>
          <Label>標題</Label>
          <NormalTextInput
            value={title}
            placeholder="輸入問卷的標題"
            changeHandler={(event: ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target;
              setField(settingActionType.TITLE, value);
            }}
          />
        </Field>
        <Field>
          <Label>頁面模式</Label>
          <ModeSelect />
        </Field>
      </SectionWrapper>
    </>
  );
};

export default SectionNormal;
