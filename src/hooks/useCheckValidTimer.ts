import { useRef } from "react";

const useCheckValidTimer = () => {
  const timerRef = useRef<any>();

  const timerHandler = (callback: () => void, time: number) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(callback, time);
  };
  return timerHandler;
};

export default useCheckValidTimer;
