import { useContext } from "react";
import { adminContext } from "../store/context/adminContext";
import adminActionType from "../store/actionType/adminActionType";
import useRoutePush from "./useRoutePush";

const usePushToAnalysisPage = () => {
  const context = useContext(adminContext);
  const pushRouterHandler = useRoutePush();
  const goToAnalysisPageHandler = (pageIndex: number, formId: string) => {
    context.setField(adminActionType.CURRENT_ANALYSIS_PAGE, pageIndex);
    context.setField(adminActionType.EDITING_FORM_ID, formId);
    pushRouterHandler(`/admin/analysis/${formId}`);
  };

  return goToAnalysisPageHandler;
};

export default usePushToAnalysisPage;
