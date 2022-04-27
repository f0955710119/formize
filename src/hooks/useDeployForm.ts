import { useAppDispatch } from "./useAppDispatch";
import { adminActions } from "../store/slice/adminSlice";
import { Settings, Styles } from "../types/survey";
import { Question } from "../types/question";
import firebase from "../utils/firebase";

const useDeployForm = () => {
  const dispatch = useAppDispatch();
  const sendFormDataHandler = async (sendingObj: {
    uid: string;
    groupId: string;
    settings: any;
    questions: Question[];
    styles: Styles;
  }) => {
    try {
      // handle picture
      const hasUploadedStartPageImage =
        sendingObj.settings.startPageImageFile &&
        typeof sendingObj.settings.startPageImageFile !== "string";
      const hasUploadedEndPageImage =
        sendingObj.settings.endPageImageFile &&
        typeof sendingObj.settings.endPageImageFile !== "string";
      // const hasQuestionImagesArr = sendingObj.questions.map(
      //   (question) => question.image
      // );
      // console.log(sendingObj.settings.endPageImageFile.type);
      const imageArr = [];

      if (hasUploadedStartPageImage) {
        const startPageImageUrl = await firebase.generateImageUrl(
          hasUploadedStartPageImage
        );
        imageArr.push(startPageImageUrl);
      }

      if (hasUploadedEndPageImage) {
        const endPageImageUrl = await firebase.generateImageUrl(
          hasUploadedEndPageImage
        );
        imageArr.push(endPageImageUrl);
      }

      console.log(imageArr);

      const newSendingObj = {
        ...sendingObj,
        settings: {
          ...sendingObj.settings,
          startPageImageFile: null,
          endPageImageFile: null,
        },
      };

      // console.log(newSendingObj);
      // deploy
      const response = await fetch("/api/admin/survey", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newSendingObj),
      });
      const data = await response.json();
      alert(data.message);
      if (data.status !== "success") throw "上傳資料失敗";
      dispatch(adminActions.createNewSurveyId(data.data.surveyId));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return sendFormDataHandler;
};

export default useDeployForm;
