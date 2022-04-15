import { FC } from "react";
import styled from "styled-components";

const MartixTitleText = styled.div`
  font-size: 1.4rem;
  text-align: center;
  margin-left: 1rem;
`;

interface MartixTitleProps {
  id: string;
  martix: string;
}

const MartixTitle: FC<MartixTitleProps> = ({
  id,
  martix,
}: MartixTitleProps) => {
  return <MartixTitleText>{martix}</MartixTitleText>;
};

export default MartixTitle;
