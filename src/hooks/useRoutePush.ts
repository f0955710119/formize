import { useRouter } from "next/router";

const useRoutePush = () => {
  const router = useRouter();

  const pushRouteHandler = (path: string) => {
    router.push(path);
  };

  return pushRouteHandler;
};

export default useRoutePush;
