import { FC, useContext } from "react";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Image as ImageIcon } from "@styled-icons/evil/Image";
import styled from "styled-components";

import settingActionType from "../../../../store/actionType/settingActionType";
import { settingContext } from "../../../../store/context/settingContext";
import sweetAlert from "../../../../utils/sweetAlert";
import scrollBar from "../../../UI/scrollBar";
import Field from "../UI/Field";
import Input from "../UI/Input";
import Label from "../UI/Label";
import SectionWrapper from "../UI/Section";

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
  cursor: pointer;
`;

const UploadImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  const {
    startPageParagraph,
    endPageParagraph,
    startPageImageObjectUrl,
    endPageImageObjectUrl,
    setField,
  } = useContext(settingContext);

  return (
    <SectionWrapper>
      <BannerField>
        <ParagraphLabel
          labelText="歡迎頁圖檔"
          reminderText={`上限5MB\n比例建議4:3`}
        />
        <ImageLabel htmlFor="welcome-banner">
          {startPageImageObjectUrl ? (
            <Image src={startPageImageObjectUrl} />
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

            setField(settingActionType.START_PAGE_IMAGE_OBJECT_URL, url);
            setField(settingActionType.START_PAGE_IMAGE_FILE, file);
          }}
        />
      </BannerField>
      <BannerField style={{ height: "13rem" }}>
        <ParagraphLabel labelText="歡迎頁文字" reminderText="限250字" />
        <CustomTextareaAutosize
          value={startPageParagraph ? startPageParagraph : ""}
          minRows={6}
          maxRows={6}
          onChange={(event) => {
            const { value } = event.target;
            if (value.length > 250) {
              sweetAlert.errorReminderAlert("不可超過250字");
              return;
            }
            setField(settingActionType.START_PAGE_PARAGRAPH, value);
          }}
        />
      </BannerField>
      <BannerField>
        <ParagraphLabel
          labelText="結束頁圖檔"
          reminderText={`上限5MB\n比例建議4:3`}
        />
        <ImageLabel htmlFor="end-banner">
          {endPageImageObjectUrl ? (
            <Image src={endPageImageObjectUrl} />
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

            setField(settingActionType.END_PAGE_IMAGE_OBJECT_URL, url);
            setField(settingActionType.END_PAGE_IMAGE_FILE, file);
          }}
        />
      </BannerField>
      <BannerField style={{ height: "13rem" }}>
        <ParagraphLabel labelText="結束頁文字" reminderText="限250字" />
        <CustomTextareaAutosize
          value={endPageParagraph ? endPageParagraph : ""}
          minRows={6}
          maxRows={6}
          onChange={(event) => {
            const { value } = event.target;
            if (value.length > 250) {
              sweetAlert.errorReminderAlert("不可超過250字");
              return;
            }
            setField(settingActionType.END_PAGE_PARAGRAPH, value);
          }}
        />
      </BannerField>
    </SectionWrapper>
  );
};

export default SectionBanner;
