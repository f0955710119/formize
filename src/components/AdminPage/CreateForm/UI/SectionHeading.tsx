import { FC, ReactNode } from "react";
import styled from "styled-components";

export const Heading = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  font-size: 1.8rem;
  color: #c9ab59;
  border-bottom: 2px solid #c9ab59;
  cursor: default;
`;

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

const SectionHeading: FC<SectionHeadingProps> = ({
  children,
  className,
}: SectionHeadingProps) => {
  return <Heading className={className}>{children}</Heading>;
};

export default SectionHeading;
