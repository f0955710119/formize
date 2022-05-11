import { FC, useRef, ChangeEvent, useState, useEffect } from "react";
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
import Modal from "../UI/Modal";

import helper from "../../../../utils/helper";
import settingConfig from "../../../../configs/settingConfig";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { questionActions } from "../../../../store/slice/questionSlice";
import breakpointConfig from "../../../../configs/breakpointConfig";

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
  const { setting } = useAppSelector((state) => state);
  const [selectedMode, setSelectedMode] = useState<string>(setting.mode);
  const [switchModeComfirmModal, setSwitchModeComfirmModal] =
    useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const timeUnit = useRef<number>(1);
  const limitTime = useRef<number>(1);

  const isNotBeyond584px =
    windowWidth > Number.parseInt(breakpointConfig.tabletS);

  useEffect(() => {
    const width = window.innerWidth;
    setWindowWidth(width);
  }, [windowWidth]);

  console.log(setting);

  const dispatchNormalSettingHandler = (
    value: string | number | object | null,
    actionType: string
  ) => {
    dispatch(settingActions.updateSingleSettingInput({ actionType, value }));
  };

  const switchModeHandler = () => {
    dispatchNormalSettingHandler(selectedMode, settingActionType.MODE);
    dispatch(
      questionActions.updateQuestionPage({ page: 1, isSwitchMode: true })
    );
    dispatch(
      settingActions.updateSingleSettingInput({
        actionType: settingActionType.PAGE_QUANTITY,
        value: 1,
      })
    );
    setSwitchModeComfirmModal(false);
  };

  const cancelSwitchModeHandler = () => {
    setSelectedMode(setting.mode);
    setSwitchModeComfirmModal(false);
  };

  return (
    <>
      <Modal
        hasOpenModal={switchModeComfirmModal}
        setModal={setSwitchModeComfirmModal}
        submuitButtonText="確認切換"
        undoButtonText="取消"
        submitHandler={switchModeHandler}
        cancelHandler={cancelSwitchModeHandler}
      >
        改變問卷模式將會移除原本題型的分頁，確認要執行嗎?
      </Modal>

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
              dispatchNormalSettingHandler(value, settingActionType.TITLE);
            }}
          />
        </Field>
        {/* <Field>
          <Label>問卷狀態</Label>
          <CustomedFormControl>
            <Select
              value={setting.status}
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
        </Field> */}
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
                    setSelectedMode("" + i);
                    setSwitchModeComfirmModal(true);
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </CustomedFormControl>
        </Field>
        {/* <Field>
          <Label>填答時間限制</Label>
          <NormalTextInput
            value={setting.limitedAnswerTime}
            style={{
              width: `${isNotBeyond584px ? "50%" : "40%"}`,
            }}
            type="number"
            placeholder={
              isNotBeyond584px ? "請填寫數值，並選擇單位" : "請填寫數值"
            }
            changeHandler={(event: ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target;
              limitTime.current = +value;
              dispatchNormalSettingHandler(
                +value * timeUnit.current,
                settingActionType.LIMITED_ANSWER_TIME
              );
            }}
          />
          <CustomedFormControl
            style={{
              width: `${
                isNotBeyond584px ? "calc(50% - 12rem)" : "calc(60% - 12rem)"
              }`,
            }}
          >
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
            value={setting.limitedResponseQuantity}
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
        </Field> */}
      </SectionWrapper>
    </>
  );
};

export default SectionNormal;
