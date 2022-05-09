import { useRouter } from "next/router";
import { useEffect } from "react";

const useRouterLoaded = (handler: any) => {
  const router = useRouter();
  const { isReady } = router;

  useEffect(() => {
    if (!isReady) return;
    handler();
  }, [isReady]);
};

export default useRouterLoaded;
