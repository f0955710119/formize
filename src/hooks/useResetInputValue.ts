import { userActions } from "../store/slice/userSlice";
import { useAppDispatch } from "./useAppDispatch";

const useResetInputValue = () => {
  const dispatch = useAppDispatch();

  const resetInputHandler = (questionIdIndex: number) => {
    dispatch(userActions.updateFormAnswer({ questionIdIndex, input: null }));
  };

  return resetInputHandler;
};

export default useResetInputValue;
