import { FC, useContext } from "react";
import styled from "styled-components";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import SectionWrapper from "../UI/Section";
import SectionHeading from "../UI/SectionHeading";
import Field from "../UI/Field";
import Label from "../UI/Label";
import Input from "../UI/Input";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { settingActions } from "../../../../store/slice/settingSlice";
import settingActionType from "../../../../store/actionType/settingActionType";
import { settingContext } from "../../../../store/context/settingContext";
import scrollBar from "../../../UI/scrollBar";
import sweetAlert from "../../../../utils/sweetAlert";

const BannerField = styled(Field)`
  height: 39rem;
  align-items: start;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const ImageLabel = styled(Label)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 12rem);
  height: 100%;
  background-color: #eee;
  z-index: 1;
`;

const CustomTextareaAutosize = styled(TextareaAutosize)`
  padding: 1rem;
  width: calc(100% - 12rem);
  border: 1px solid #aaa;
  border-radius: 0px;
  font-size: 1.8rem;
  resize: none;
  /* background-color: transparent; */
  ${scrollBar}
  /* &::-webkit-scrollbar {
    display: none;
  } */
  &:focus {
    outline: none;
  }
`;

const TexteraInput = styled(Input)`
  height: 100%;
`;

const ImageInput = styled(Input)`
  height: 0;
  display: none;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const SectionBanner: FC = () => {
  const settingContextData = useContext(settingContext);
  const dispatch = useAppDispatch();
  console.log(settingContextData);

  return (
    <SectionWrapper>
      {/* <SectionHeading>橫幅設定</SectionHeading> */}
      <BannerField>
        <Label>
          歡迎頁圖檔
          <br />
          <span style={{ fontSize: "1.2rem", color: "#4b6655" }}>
            上限5MB，比例建議4:3
          </span>
        </Label>
        <ImageLabel htmlFor="welcome-banner">
          {settingContextData.startPageImageObjectUrl ? (
            <Image src={settingContextData.startPageImageObjectUrl} />
          ) : (
            "點擊上傳"
          )}
        </ImageLabel>
        <ImageInput
          type="file"
          accept="image/*"
          id="welcome-banner"
          onChange={(event) => {
            if (event.target.files === null) return;
            const file = event.target.files[0];
            if (!file) return;
            if (file.size > 5_000_000) {
              sweetAlert.errorReminderAlert("不可上傳超過5MB的圖片!");
              return;
            }

            const url = URL.createObjectURL(file);

            settingContextData.setField(
              settingActionType.START_PAGE_IMAGE_OBJECT_URL,
              url
            );
            settingContextData.setField(
              settingActionType.START_PAGE_IMAGE_FILE,
              file
            );
          }}
        />
      </BannerField>
      <BannerField style={{ height: "15rem" }}>
        <Label>
          歡迎頁文字
          <br />
          <span style={{ fontSize: "1.2rem", color: "#4b6655" }}>限250字</span>
        </Label>
        <CustomTextareaAutosize
          minRows={5}
          maxRows={5}
          onChange={(event) => {
            if (event.target.value.length > 250) {
              sweetAlert.errorReminderAlert("不可超過250字");
              return;
            }
            dispatch(
              settingActions.updateSingleSettingInput({
                actionType: settingActionType.START_PAGE_PARAGRAPH,
                value: event.target.value,
              })
            );
          }}
        />
      </BannerField>
      <BannerField>
        <Label>
          結束頁圖檔
          <br />
          <span style={{ fontSize: "1.2rem", color: "#4b6655" }}>
            上限5MB，比例建議4:3
          </span>
        </Label>
        <ImageLabel htmlFor="end-banner">
          {settingContextData.endPageImageObjectUrl ? (
            <Image src={settingContextData.endPageImageObjectUrl} />
          ) : (
            "點擊上傳"
          )}
        </ImageLabel>
        <ImageInput
          type="file"
          accept="image/*"
          id="end-banner"
          onChange={(event) => {
            if (event.target.files === null) return;
            const file = event.target.files[0];
            if (!file) return;
            if (file.size > 5_000_000) {
              sweetAlert.errorReminderAlert("不可上傳超過5MB的圖片!");
              return;
            }

            const url = URL.createObjectURL(file);

            settingContextData.setField(
              settingActionType.END_PAGE_IMAGE_OBJECT_URL,
              url
            );
            settingContextData.setField(
              settingActionType.END_PAGE_IMAGE_FILE,
              file
            );
          }}
        />
      </BannerField>
      <BannerField style={{ height: "15rem" }}>
        <Label>
          結束頁文字
          <br />
          <span style={{ fontSize: "1.2rem", color: "#4b6655" }}>限250字</span>
        </Label>
        <CustomTextareaAutosize
          minRows={5}
          maxRows={5}
          onChange={(event) => {
            if (event.target.value.length > 250) {
              sweetAlert.errorReminderAlert("不可超過250字");
              return;
            }
            dispatch(
              settingActions.updateSingleSettingInput({
                actionType: settingActionType.END_PAGE_PARAGRAPH,
                value: event.target.value,
              })
            );
          }}
        />
      </BannerField>
    </SectionWrapper>
  );
};

export default SectionBanner;
