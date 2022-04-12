import { FC } from "react";
import styled from "styled-components";

const CustomHeading = styled.div`
  margin-bottom: 3rem;
  width: 100%;
  font-size: 2rem;
  line-break: strict;
`;

interface HeadingProps {
  text: string;
}

const Heading: FC<HeadingProps> = ({ text }: HeadingProps) => {
  return <CustomHeading>{text}</CustomHeading>;
};

export default Heading;
