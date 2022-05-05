import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";

interface LogoWrapper {
  mediaSetting?: string;
}

const LogoWrapper = styled.div<LogoWrapper>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props: LogoWrapper) => props.mediaSetting}
`;

interface LogoTextProps {
  fontSize: string;
  textMediaSetting?: string;
}

const LogoText = styled.span<LogoTextProps>`
  display: block;
  font-size: ${(props: LogoTextProps) => props.fontSize};
  color: inherit;
  font-family: jfOpenhuninn !important;

  ${(props: LogoTextProps) => props.textMediaSetting};
`;

interface LogoProps {
  fontSize?: string;
  style?: {
    [key: string]: string;
  };
  mediaSetting?: string;
  textMediaSetting?: string;
  className?: string;
}

const Logo: FC<LogoProps> = ({
  fontSize,
  style,
  mediaSetting,
  textMediaSetting,
  className,
}: LogoProps) => {
  return (
    <Link href="/admin">
      <LogoWrapper
        style={{ ...style }}
        mediaSetting={mediaSetting}
        className={className}
      >
        <LogoText
          fontSize={fontSize ? fontSize : "2.6rem"}
          textMediaSetting={textMediaSetting}
        >
          FORMiZE
        </LogoText>
      </LogoWrapper>
    </Link>
  );
};

export default Logo;
