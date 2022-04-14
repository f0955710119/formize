import { FC } from "react";
import styled from "styled-components";
import Field from "./UI/Field";

const Heading = styled.div`
  width: 100%;
  font-size: 2rem;
  line-break: strict;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const IntroductionField = styled(Field)`
  padding: 2rem;
  border: 3px solid #f90;
  color: #b06b04;
  font-weight: bold;
`;

interface IntroductionProps {
  id: string;
}

const Introduction: FC = () => {
  return (
    <IntroductionField>
      <Heading>
        "東運基受認可路回出不來然超容有星讀，心社英收？起達數因大人價始境家位應動見係頭！你將指層的更之老中年可望，股至香魚吸而列分！"
      </Heading>
    </IntroductionField>
  );
};

export default Introduction;
