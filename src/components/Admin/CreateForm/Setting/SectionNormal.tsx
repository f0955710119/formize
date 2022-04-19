import { FC, useRef, ChangeEvent } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { settingActions } from "../../../../store/slice/settingSlice";
import settingActionType from "../../../../store/actionType/settingActionType";

import styled from "styled-components";
import { FormControl, Select, MenuItem } from "@mui/material";

import SectionWrapper from "../UI/Section";
import SectionHeading from "../UI/SectionHeading";
import Field from "../UI/Field";
import Label from "../UI/Label";
import NormalTextInput from "./SectionNormal/NormalTextInput";

import helper from "../../../../utils/helper";
import settingConfig from "../../../../configs/settingConfig";

const { DEFAULT_STATUS_LIST, DEFAULT_MODE_LIST, DEFAULT_UNIT_LIST } =
  settingConfig;

const CustomedFormControl = styled(FormControl)`
  width: calc(100% - 12rem);
  height: 100%;
  border-radius: 0px;
  & div {
    border-radius: 0px;
    height: 100%;
  }
`;

const SectionNormal: FC = () => {
  const dispatch = useAppDispatch();

  const timeUnit = useRef<number>(1);
  const limitTime = useRef<number>(1);

  const dispatchNormalSettingHandler = (
    value: string | number | object | null,
    actionType: string
  ) => {
    dispatch(settingActions.updateSingleSettingInput({ actionType, value }));
  };

  return (
    <SectionWrapper>
      <SectionHeading>一般設定</SectionHeading>
      <Field>
        <Label>標題</Label>
        <NormalTextInput
          type="text"
          placeholder="輸入問卷的標題"
          changeHandler={(event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.currentTarget;
            dispatchNormalSettingHandler(value, settingActionType.TITLE);
          }}
        />
      </Field>
      <Field>
        <Label>問卷狀態</Label>
        <CustomedFormControl>
          <Select
            defaultValue="0"
            onChange={(event) => {
              const { value } = event.target;
              dispatchNormalSettingHandler(value, settingActionType.STATUS);
            }}
          >
            {DEFAULT_STATUS_LIST.map((option, i) => (
              <MenuItem value={"" + i} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </CustomedFormControl>
      </Field>
      <Field>
        <Label>頁面模式</Label>
        <CustomedFormControl>
          <Select
            defaultValue="0"
            onChange={(event) => {
              const { value } = event.target;
              dispatchNormalSettingHandler(value, settingActionType.MODE);
            }}
          >
            {DEFAULT_MODE_LIST.map((option, i) => (
              <MenuItem value={"" + i} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </CustomedFormControl>
      </Field>
      <Field>
        <Label>填答時間限制</Label>
        <NormalTextInput
          style={{ width: "50%" }}
          type="number"
          placeholder="請填寫數值，並選擇單位"
          changeHandler={(event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            limitTime.current = +value;
            dispatchNormalSettingHandler(
              +value * timeUnit.current,
              settingActionType.LIMITED_ANSWER_TIME
            );
          }}
        />
        <CustomedFormControl style={{ width: "calc(50% - 12rem)" }}>
          <Select
            defaultValue="0"
            onChange={(event) => {
              const { value } = event.target;
              const unitTimeNumber = helper.generateResponsedUnitTime(value);
              timeUnit.current = unitTimeNumber;
              dispatchNormalSettingHandler(
                limitTime.current * unitTimeNumber,
                settingActionType.LIMITED_ANSWER_TIME
              );
            }}
          >
            {DEFAULT_UNIT_LIST.map((option, i) => (
              <MenuItem value={i} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </CustomedFormControl>
      </Field>
      <Field>
        <Label>上限回應筆數</Label>
        <NormalTextInput
          type="number"
          placeholder="限制問卷的填答上限數量"
          changeHandler={(event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            dispatchNormalSettingHandler(
              +value,
              settingActionType.LIMITED_RESPONSE_QUANTITY
            );
          }}
        />
      </Field>
    </SectionWrapper>
  );
};

export default SectionNormal;
