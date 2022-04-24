import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 10rem; */
  cursor: pointer;
`;

interface LogoTextProps {
  fontSize: string;
}

const LogoText = styled.span<LogoTextProps>`
  display: block;
  /* width: 100%; */
  font-size: ${(props: LogoTextProps) => props.fontSize};
  color: #333;
  font-family: Vidaloka !important;
`;

interface LogoProps {
  fontSize?: string;
}

const Logo: FC<LogoProps> = ({ fontSize }: LogoProps) => {
  return (
    <Link href="/admin">
      <LogoWrapper>
        <LogoText fontSize={fontSize ? fontSize : "2.6rem"}>FORMiZE</LogoText>
      </LogoWrapper>
    </Link>
  );
};

export default Logo;
