import { FC, useContext } from "react";
import styled from "styled-components";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import SectionWrapper from "../UI/Section";
import Field from "../UI/Field";
import Label from "../UI/Label";
import Input from "../UI/Input";

import { Image as ImageIcon } from "@styled-icons/evil/Image";

import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { settingActions } from "../../../../store/slice/settingSlice";
import settingActionType from "../../../../store/actionType/settingActionType";
import { settingContext } from "../../../../store/context/settingContext";
import scrollBar from "../../../UI/scrollBar";
import sweetAlert from "../../../../utils/sweetAlert";

const BannerField = styled(Field)`
  height: 39rem;
  align-items: start;
  margin-top: 1rem;

  &:not(:last-child) {
    margin-bottom: 1.4rem;
  }
`;

const ImageLabel = styled(Label)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(100% - 12rem);
  height: 100%;
  border-radius: 3px;
  cursor: pointer;
  background-color: #eee;
  z-index: 1;
`;

const CustomTextareaAutosize = styled(TextareaAutosize)`
  padding: 1rem;
  width: calc(100% - 12rem);
  border: 1px solid #aaa;
  border-radius: 3px;
  font-size: 1.5rem;
  resize: none;

  ${scrollBar}

  &:focus {
    outline: none;
  }
`;

const TextareaLabelText = styled.span`
  font-size: 1.4rem;
  color: #c9ab59;
  white-space: pre-line;
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

const UploadImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UploadImageIcon = styled(ImageIcon)`
  width: 10.6rem;
  height: 10.6rem;
  fill: #aaa;
`;

const UploadImageText = styled.span`
  font-size: 1.6rem;
  text-align: center;
  color: #888;
  letter-spacing: 2px;
  margin-top: -1rem;
`;

const UploadImage = () => {
  return (
    <UploadImageWrapper>
      <UploadImageIcon />
      <UploadImageText>點擊上傳</UploadImageText>
    </UploadImageWrapper>
  );
};

const ParagraphLabel = ({
  labelText,
  reminderText,
}: {
  labelText: string;
  reminderText: string;
}) => {
  return (
    <Label>
      {labelText}
      <br />
      <TextareaLabelText>{reminderText}</TextareaLabelText>
    </Label>
  );
};

const SectionBanner: FC = () => {
  const settingContextData = useContext(settingContext);
  const dispatch = useAppDispatch();
  console.log(settingContextData);

  return (
    <SectionWrapper>
      <BannerField>
        <ParagraphLabel
          labelText="歡迎頁圖檔"
          reminderText={`上限5MB\n比例建議4:3`}
        />
        <ImageLabel htmlFor="welcome-banner">
          {settingContextData.startPageImageObjectUrl ? (
            <Image src={settingContextData.startPageImageObjectUrl} />
          ) : (
            <UploadImage />
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
      <BannerField style={{ height: "13rem" }}>
        <ParagraphLabel labelText="歡迎頁文字" reminderText="限250字" />
        <CustomTextareaAutosize
          minRows={6}
          maxRows={6}
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
        <ParagraphLabel
          labelText="結束頁圖檔"
          reminderText={`上限5MB\n比例建議4:3`}
        />
        <ImageLabel htmlFor="end-banner">
          {settingContextData.endPageImageObjectUrl ? (
            <Image src={settingContextData.endPageImageObjectUrl} />
          ) : (
            <UploadImage />
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
      <BannerField style={{ height: "13rem" }}>
        <ParagraphLabel labelText="結束頁文字" reminderText="限250字" />
        <CustomTextareaAutosize
          minRows={6}
          maxRows={6}
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
