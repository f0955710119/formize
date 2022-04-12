import { FC } from "react";
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
  return (
    <SectionWrapper>
      <SectionHeading>橫幅設定</SectionHeading>
      <BannerField>
        <Label>歡迎頁文字</Label>
        <ImageLabel htmlFor="welcome-banner" />
        <ImageInput type="file" id="welcome-banner" />
      </BannerField>
      <TexteraInput type="text" />
      <BannerField>
        <Label>結束頁文字</Label>
        <ImageLabel htmlFor="end-banner" />
        <ImageInput type="file" id="end-banner" />
      </BannerField>
      <TexteraInput type="text" />
    </SectionWrapper>
  );
};

export default SectionBanner;
