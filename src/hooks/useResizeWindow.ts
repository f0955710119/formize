import { useEffect, useState } from "react";

const useResizeWindow = (wideRange: number) => {
  const [isWiderThanRange, setIsWiderThanRange] = useState<boolean>(
    window.innerWidth > wideRange
  );

  useEffect(() => {
    if (typeof window === undefined) return;
    if (window === null) return;

    const callback = () => {
      const isWiderThanWideRange = window.innerWidth > wideRange;
      if (isWiderThanRange === isWiderThanWideRange) return;
      setIsWiderThanRange(isWiderThanWideRange);
    };
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, [window.innerWidth]);

  return isWiderThanRange;
};

export default useResizeWindow;
