import { FC, ChangeEvent, useContext } from "react";

import settingActionType from "../../../../store/actionType/settingActionType";
import Field from "../UI/Field";
import Label from "../UI/Label";
import SectionWrapper from "../UI/Section";
import SectionHeading from "../UI/SectionHeading";
import NormalTextInput from "./SectionNormal/NormalTextInput";
import { settingContext } from "../../../../store/context/settingContext";
import ModeSelect from "./SectionNormal/ModeSelect";

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
            changeHandler={(event: ChangeEvent<HTMLInputElement>) =>
              setField(settingActionType.TITLE, event.currentTarget.value)
            }
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
