import { FC } from "react";
import styled from "styled-components";

import breakpointConfig from "../../../../../configs/breakpointConfig";

interface HeaderItemWrapperProps {
  isActive: boolean;
}

const HeaderItemWrapper = styled.div<HeaderItemWrapperProps>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  color: ${(props: HeaderItemWrapperProps) =>
    props.isActive ? "#c9ab59" : "inherit"};
  font-weight: ${(props: HeaderItemWrapperProps) =>
    props.isActive ? "bold" : "inherit"};
  border-right: 1px solid #c8c8c8;
  transition: color 0.3s;

  @media ${breakpointConfig.laptopM} {
    border-right: none;
  } ;
`;

const ItemText = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 1.4rem;
`;

interface HeaderItemProps {
  title: string;
  option: number;
  stylingOption: number;
  setStylingOption(option: number): void;
}

const HeaderItem: FC<HeaderItemProps> = ({
  title,
  option,
  stylingOption,
  setStylingOption,
}: HeaderItemProps) => {
  return (
    <HeaderItemWrapper
      onClick={() => setStylingOption(option)}
      isActive={stylingOption === option}
    >
      <ItemText>{title}</ItemText>
    </HeaderItemWrapper>
  );
};

export default HeaderItem;
