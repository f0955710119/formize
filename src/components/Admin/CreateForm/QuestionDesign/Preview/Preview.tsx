import { FC } from "react";
import styled from "styled-components";
import Layout from "../UI/Layout";

const PreviewLayout = styled(Layout)`
  width: 60%;
`;

const Preview: FC = () => {
  return <PreviewLayout>1</PreviewLayout>;
};

export default Preview;
