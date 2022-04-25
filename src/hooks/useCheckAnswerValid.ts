import { useState } from "react";

const useCheckAnswerValid = () => {
  const [invalidMessage, setInvalidMessage] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const showInvalidHandler = (errorMessage: string) => {
    setIsInvalid(true);
    setInvalidMessage(errorMessage);
  };

  return {
    invalidMessage,
    setInvalidMessage,
    isInvalid,
    setIsInvalid,
    showInvalidHandler,
  };
};

export default useCheckAnswerValid;
