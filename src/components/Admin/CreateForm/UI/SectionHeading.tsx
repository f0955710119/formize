import { FC, ReactNode } from "react";
import styled from "styled-components";

export const Heading = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  font-size: 1.6rem;
  color: #a46302;
  border-bottom: 0.1px solid #a46302;
`;

interface SectionHeadingProps {
  children: ReactNode;
}

const SectionHeading: FC<SectionHeadingProps> = ({
  children,
}: SectionHeadingProps) => {
  return <Heading>{children}</Heading>;
};

export default SectionHeading;
