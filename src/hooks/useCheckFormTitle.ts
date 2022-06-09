import { useContext } from "react";
import { settingContext } from "../store/context/settingContext";
import sweetAlert from "../utils/sweetAlert";

const useCheckFormTitle = () => {
  const { title } = useContext(settingContext);

  const checkFormTitleHandler = () => {
    if (title === "") {
      sweetAlert.errorReminderAlert("請一定要填寫問卷的標題！");
      return true;
    }

    if (title.length > 50) {
      sweetAlert.errorReminderAlert("問卷標題不能超過50個字！");
      return true;
    }

    return false;
  };

  return checkFormTitleHandler;
};

export default useCheckFormTitle;
