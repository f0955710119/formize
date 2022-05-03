import { useEffect, useState } from "react";

const useWindow = () => {
  const [windowObject, setWindowObject] = useState<Window | null>();

  useEffect(() => {
    setWindowObject(window);
  }, [windowObject]);

  return windowObject;
};

export default useWindow;
