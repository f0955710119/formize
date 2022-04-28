import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface LogoTextProps {
  fontSize: string;
}

const LogoText = styled.span<LogoTextProps>`
  display: block;
  font-size: ${(props: LogoTextProps) => props.fontSize};
  color: #333;
  font-family: jfOpenhuninn !important;
`;

interface LogoProps {
  fontSize?: string;
  style?: {
    margin?: string;
    justifyContent?: string;
    alignItems?: string;
  };
}

const Logo: FC<LogoProps> = ({ fontSize, style }: LogoProps) => {
  return (
    <Link href="/admin">
      <LogoWrapper style={style}>
        <LogoText fontSize={fontSize ? fontSize : "2.6rem"}>FORMiZE</LogoText>
      </LogoWrapper>
    </Link>
  );
};

export default Logo;
