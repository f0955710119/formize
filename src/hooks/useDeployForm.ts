import { useAppDispatch } from "./useAppDispatch";
import { adminActions } from "../store/slice/adminSlice";

const useDeployForm = () => {
  const dispatch = useAppDispatch();
  const sendFormDataHandler = async (sendingObj: object) => {
    try {
      const response = await fetch("/api/admin/survey", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(sendingObj),
      });
      const data = await response.json();
      alert(data.message);
      if (data.status !== "success") throw "上傳資料失敗";
      dispatch(adminActions.createNewSurveyId(data.data.survey_id));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return sendFormDataHandler;
};

export default useDeployForm;
