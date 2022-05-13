import { FC, ChangeEvent, useState, useEffect, useRef } from "react";
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

import settingConfig from "../../../../configs/settingConfig";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { questionActions } from "../../../../store/slice/questionSlice";
import sweetAlert from "../../../../utils/sweetAlert";

const { DEFAULT_MODE_LIST } = settingConfig;

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
  const { setting } = useAppSelector((state) => state);
  const [selectedMode, setSelectedMode] = useState<string>(setting.mode);
  const hasUpdateMode = useRef<boolean>(false);

  const dispatchNormalSettingHandler = (
    actionType: string,
    value: string | number | object | null
  ) => {
    dispatch(settingActions.updateSingleSettingInput({ actionType, value }));
  };

  const switchModeHandler = () => {
    dispatchNormalSettingHandler(settingActionType.MODE, selectedMode);
    dispatch(
      questionActions.updateQuestionPage({ page: 1, isSwitchMode: true })
    );
    dispatch(
      settingActions.updateSingleSettingInput({
        actionType: settingActionType.PAGE_QUANTITY,
        value: 1,
      })
    );
  };

  useEffect(() => {
    if (!hasUpdateMode.current) return;
    hasUpdateMode.current = false;
    switchModeHandler();
  }, [selectedMode]);

  return (
    <>
      <SectionWrapper>
        <SectionHeading>一般設定</SectionHeading>
        <Field>
          <Label>標題</Label>
          <NormalTextInput
            value={setting.title}
            type="text"
            placeholder="輸入問卷的標題"
            changeHandler={(event: ChangeEvent<HTMLInputElement>) => {
              const { value } = event.currentTarget;
              dispatchNormalSettingHandler(settingActionType.TITLE, value);
            }}
          />
        </Field>
        <Field>
          <Label>頁面模式</Label>
          <CustomedFormControl>
            <Select value={setting.mode}>
              {DEFAULT_MODE_LIST.map((option, i) => (
                <MenuItem
                  value={"" + i}
                  key={option}
                  onClick={() => {
                    if (+selectedMode === i) return;
                    const modeReminderText =
                      +selectedMode === 0
                        ? "改變分頁模式會完全改動當前的分頁設定，\n如:「當前的題目將全部移動至第一頁」，\n確定要改變嗎?"
                        : "改變分頁模式會完全改動當前的分頁設定，\n如:「分頁將歸為第一頁，而當前的分頁將不被儲存」，\n確定要改變嗎?";

                    sweetAlert.clickToConfirmAlert(
                      {
                        title: "切換模式",
                        text: modeReminderText,
                        cancelButtonText: "取消變動",
                        confirmButtonText: "確定切換",
                        imageUrl: `${process.env.NEXT_PUBLIC_ORIGIN}/images/loading-reminder.svg`,
                      },
                      () => {
                        setSelectedMode("" + i);
                        hasUpdateMode.current = true;
                      }
                    );
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </CustomedFormControl>
        </Field>
      </SectionWrapper>
    </>
  );
};

export default SectionNormal;
