import styled from "styled-components";

import breakpointConfig from "../../../../../configs/breakpointConfig";

export const SwitchFieldReminder = styled.div`
  position: absolute;
  top: 1rem;
  left: 1.8rem;

  opacity: 0;
  visibility: hidden;

  padding: 0.4rem;
  text-align: center;
  font-size: 1.7rem;
  background-color: #fff;
  color: #f90;

  transition: opacity 0.3s, visibility 0.3s;
`;

const showFieldReminderAnimation = `
  animation: showReminder 1.5s ease-in-out;
  @keyframes showReminder {
    0% {
      transform: translateX(-1rem);
      opacity: 0;
      visibility: hidden;
    }
    50% {
      transform: translateX(0rem);
      opacity: 1;
      visibility: visible;
    }
    90% {
      transform: translateX(0rem);
      opacity: 1;
      visibility: visible;
    }
    100% {
      transform: translateX(-1rem);
      opacity: 0;
      visibility: hidden;
    }
  }
`;
interface FieldProps {
  isActive?: boolean;
}

const Field = styled.div<FieldProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4rem;
  border-radius: 3px;
  border: ${(props) =>
    props.isActive ? `3px solid ${props.theme.note};` : "1px solid #c8c8c8;"};

  ${(props) => (props.isActive ? "" : "cursor: pointer;")}

  transition: border 0.3s;
  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  &:hover ${SwitchFieldReminder} {
    ${(props) => (props.isActive ? "" : showFieldReminderAnimation)}
  }

  @media ${breakpointConfig.tabletS} {
    padding: 2rem;
  }
`;

export default Field;
