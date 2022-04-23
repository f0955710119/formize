import { ChangeEventHandler, FC, useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import SectionWrapper from "../UI/Section";
import SectionHeading from "../UI/SectionHeading";
import Field from "../UI/Field";
import Label from "../UI/Label";
import Input from "../UI/Input";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { settingActions } from "../../../../store/slice/settingSlice";
import settingActionType from "../../../../store/actionType/settingActionType";

const BannerField = styled(Field)`
  height: 15rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ImageLabel = styled(Label)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 12rem);
  height: 15rem;
  background-color: #aaa;
  z-index: 1;
`;

const TexteraInput = styled(Input)`
  height: 12rem;
  align-self: end;
  margin-bottom: 2rem;
`;

const ImageInput = styled(Input)`
  height: 0;
  display: none;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SectionBanner: FC = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((state) => state);
  const [startPageImage, setStartPageImage] = useState<string | null>(() => {
    if (!setting.startPageImageFile) return null;
    const url = URL.createObjectURL(setting.startPageImageFile);
    return url;
  });
  const [endPageImage, setEndPageImage] = useState<string | null>(() => {
    if (!setting.endPageImageFile) return null;
    const url = URL.createObjectURL(setting.endPageImageFile);
    return url;
  });

  const changeUploadImageHandler = (
    event: any,
    typeKey: string,
    setState: Dispatch<string | null>
  ) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);

    setState(url);
    dispatch(
      settingActions.updateSingleSettingInput({
        actionType: typeKey,
        value: file,
      })
    );
  };

  return (
    <SectionWrapper>
      <SectionHeading>橫幅設定</SectionHeading>
      <BannerField>
        <Label>歡迎頁圖檔</Label>
        <ImageLabel htmlFor="welcome-banner">
          {startPageImage ? <Image src={startPageImage} /> : "點擊上傳"}
        </ImageLabel>
        <ImageInput
          type="file"
          id="welcome-banner"
          onChange={(event) => {
            changeUploadImageHandler(
              event,
              settingActionType.START_PAGE_IMAGE_FILE,
              setStartPageImage
            );
          }}
        />
      </BannerField>
      <BannerField style={{ height: "15rem" }}>
        <Label>歡迎頁文字</Label>
        <TexteraInput
          type="text"
          onChange={(event) => {
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
        <Label>結束頁圖檔</Label>
        <ImageLabel htmlFor="end-banner">
          {endPageImage ? <Image src={endPageImage} /> : "點擊上傳"}
        </ImageLabel>
        <ImageInput
          type="file"
          id="end-banner"
          onChange={(event) => {
            changeUploadImageHandler(
              event,
              settingActionType.END_PAGE_IMAGE_FILE,
              setEndPageImage
            );
          }}
        />
      </BannerField>
      <BannerField style={{ height: "15rem" }}>
        <Label>結束頁文字</Label>
        <TexteraInput
          type="text"
          onChange={(event) => {
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
