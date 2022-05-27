import { useRouter } from "next/router";

import { FC } from "react";

import styled from "styled-components";

import breakpointConfig from "../../configs/breakpointConfig";
interface LogoWrapperProps {
  mediaSetting?: string;
}

const LogoWrapper = styled.div<LogoWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props) => props.mediaSetting}
`;

interface LogoImageWrapperProps {
  imageMediaSetting?: string;
}

const LogoImageWrapper = styled.div<LogoImageWrapperProps>`
  margin-right: 1rem;
  width: 2.8rem;
  height: 2.8rem;
  transform: translateY(-0.2rem);
  cursor: pointer;
  ${(props) => props.imageMediaSetting}
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  imageMediaSetting?: string;
  className?: string;
  clickHandler?: () => void;
}

const Logo: FC<LogoProps> = ({
  fontSize,
  style,
  mediaSetting,
  textMediaSetting,
  imageMediaSetting,
  className,
  clickHandler,
}: LogoProps) => {
  const router = useRouter();
  return (
    <span
      onClick={() => {
        if (!clickHandler) {
          router.push("/admin");
          return;
        }

        clickHandler();
      }}
    >
      <LogoWrapper
        style={{ ...style }}
        mediaSetting={mediaSetting}
        className={className}
      >
        <LogoImageWrapper imageMediaSetting={imageMediaSetting}>
          <LogoImage
            src="/images/formize-logo.svg"
            alt="Formize是中文質感問卷製作工具，此為logo"
          />
        </LogoImageWrapper>
        <LogoText
          fontSize={fontSize ? fontSize : "2.6rem"}
          textMediaSetting={textMediaSetting}
        >
          FORMiZE
        </LogoText>
      </LogoWrapper>
    </span>
  );
};

export default Logo;
