import { ChangeEventHandler, FC, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import SectionWrapper from "../UI/Section";
import SectionHeading from "../UI/SectionHeading";
import Field from "../UI/Field";
import Label from "../UI/Label";
import Input from "../UI/Input";

const BannerField = styled(Field)`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ImageLabel = styled(Label)`
  width: calc(100% - 12rem);
  height: 3rem;
  background-color: #aaa;
  text-align: center;
  line-height: 30px;
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

const SectionBanner: FC = () => {
  const [welcomeImageName, setWelcomeImageName] = useState<string>("點擊上傳");
  const [endImageName, setEndImageName] = useState<string>("點擊上傳");

  const changeUploadImageHandler = (
    event: any,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    const file = event.target.files[0];
    setState(file.name);
  };

  return (
    <SectionWrapper>
      <SectionHeading>橫幅設定</SectionHeading>
      <BannerField>
        <Label>歡迎頁圖檔</Label>
        <ImageLabel htmlFor="welcome-banner">{welcomeImageName}</ImageLabel>
        <ImageInput
          type="file"
          id="welcome-banner"
          onChange={(event) => {
            changeUploadImageHandler(event, setWelcomeImageName);
          }}
        />
      </BannerField>
      <BannerField style={{ height: "15rem" }}>
        <Label>歡迎頁文字</Label>
        <TexteraInput type="text" />
      </BannerField>
      <BannerField>
        <Label>結束頁圖檔</Label>
        <ImageLabel htmlFor="end-banner">{endImageName}</ImageLabel>
        <ImageInput
          type="file"
          id="end-banner"
          onChange={(event) => {
            changeUploadImageHandler(event, setEndImageName);
          }}
        />
      </BannerField>
      <BannerField style={{ height: "15rem" }}>
        <Label>結束頁文字</Label>
        <TexteraInput type="text" />
      </BannerField>
    </SectionWrapper>
  );
};

export default SectionBanner;
