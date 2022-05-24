import { FC, useContext, useEffect, useRef, useState } from "react";


import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styled from "styled-components";

import settingConfig from "../../../../../configs/settingConfig";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import settingActinoType from "../../../../../store/actionType/settingActionType";
import { settingContext } from "../../../../../store/context/settingContext";
import { questionActions } from "../../../../../store/slice/questionSlice";
import sweetAlert from "../../../../../utils/sweetAlert";

const CustomedFormControl = styled(FormControl)`
  width: calc(100% - 12rem);
  height: 100%;
  border-radius: 0px;

  & div {
    border-radius: 0px;
    height: 100%;
  }
`;

const { DEFAULT_MODE_LIST } = settingConfig;

const singlePageReminderText =
  "改變分頁模式會完全改動當前的分頁設定，\n如:「當前的題目將全部移動至第一頁」，\n確定要改變嗎?";
const multiplePageReminderText =
  "改變分頁模式會完全改動當前的分頁設定，\n如:「分頁將歸為第一頁，而當前的分頁將不被儲存」，\n確定要改變嗎?";
const reminderImagePath = `${process.env.NEXT_PUBLIC_ORIGIN}/images/loading-reminder.svg`;

const ModeSelect: FC = () => {
  const dispatch = useAppDispatch();
  const { mode, setField } = useContext(settingContext);
  const [selectedMode, setSelectedMode] = useState<string>(mode);
  const hasUpdateMode = useRef<boolean>(false);

  const switchModeHandler = () => {
    setField(settingActinoType.MODE, selectedMode);
    setField(settingActinoType.PAGE_QUANTITY, 1);
    dispatch(
      questionActions.updateQuestionPage({ page: 1, isSwitchMode: true })
    );
  };

  const clickToSwitchModeHandler = (
    modeInfo: {
      selectedMode: string;
      currentMode: number;
      switchModeReminder: string;
      reminderImagePath: string;
    },
    callback: () => void
  ) => {
    const { selectedMode, currentMode, switchModeReminder, reminderImagePath } =
      modeInfo;
    if (+selectedMode === currentMode) return;
    sweetAlert.clickToConfirmAlert(
      {
        title: "切換模式",
        text: switchModeReminder,
        cancelButtonText: "取消變動",
        confirmButtonText: "確定切換",
        imageUrl: reminderImagePath,
      },
      callback
    );
  };

  const confirmToSwitchModeCallback = (currentMode: number) => {
    setSelectedMode("" + currentMode);
    hasUpdateMode.current = true;
  };

  useEffect(() => {
    if (!hasUpdateMode.current) return;
    hasUpdateMode.current = false;
    switchModeHandler();
  }, [selectedMode]);

  const switchModeReminder =
    selectedMode === "0" ? singlePageReminderText : multiplePageReminderText;

  return (
    <CustomedFormControl>
      <Select value={mode}>
        {DEFAULT_MODE_LIST.map((option, i) => (
          <MenuItem
            value={`${i}`}
            key={option}
            onClick={() => {
              clickToSwitchModeHandler(
                {
                  selectedMode,
                  currentMode: i,
                  switchModeReminder,
                  reminderImagePath,
                },
                () => confirmToSwitchModeCallback(i)
              );
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </CustomedFormControl>
  );
};

export default ModeSelect;
