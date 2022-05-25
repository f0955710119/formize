import { FC } from "react";
import styled from "styled-components";
import breakpointConfig from "../../../../../../configs/breakpointConfig";

const EditingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: end;
  width: 15rem;
  height: 3rem;
  margin-top: 1rem;
  text-align: center;
  line-height: 3rem;
  border-radius: 5px;
  color: #777;
  background-color: #ccc;

  &:hover {
    color: #fff;
    background-color: #333;
  }

  @media ${breakpointConfig.tabletS} {
    width: 100%;
  }
`;

interface ChoiceOptionEditingButtonProps {
  text: string;
  clickHandler: () => void;
  className?: string;
}

const ChoiceOptionEditingButton: FC<ChoiceOptionEditingButtonProps> = (props) => {
  const { text, clickHandler, className } = props;

  return (
    <EditingButton
      type="button"
      className={className}
      onClick={() => {
        clickHandler();
      }}
    >
      {text}
    </EditingButton>
  );
};

export default ChoiceOptionEditingButton;
