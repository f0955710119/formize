import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  cursor: pointer;
`;

const LogoText = styled.span`
  display: block;
  width: 100%;
  font-size: 2.6rem;
  color: #333;
  font-family: Vidaloka !important;
`;

const Logo: FC = () => {
  return (
    <Link href="/admin">
      <LogoWrapper>
        <LogoText>FORMiZE</LogoText>
      </LogoWrapper>
    </Link>
  );
};

export default Logo;
