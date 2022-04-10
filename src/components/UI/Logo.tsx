import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
`;

const LogoText = styled.span`
  display: block;
  width: 100%;
  font-size: 2.4rem;
  color: #333;
`;

const Logo: FC = () => {
  return (
    <Link href="/">
      <LogoWrapper>
        <LogoText>Formize</LogoText>
      </LogoWrapper>
    </Link>
  );
};

export default Logo;
