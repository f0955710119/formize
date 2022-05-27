import { useRouter } from "next/router";

import { useContext } from "react";

import adminActionType from "../store/actionType/adminActionType";
import { adminContext } from "../store/context/adminContext";

const usePushToAnalysisPage = () => {
  const router = useRouter();
  const context = useContext(adminContext);
  const goToAnalysisPageHandler = (pageIndex: number, formId: string) => {
    context.setField(adminActionType.CURRENT_ANALYSIS_PAGE, pageIndex);
    context.setField(adminActionType.EDITING_FORM_ID, formId);
    router.push(`/admin/analysis/${formId}`);
  };

  return goToAnalysisPageHandler;
};

export default usePushToAnalysisPage;
