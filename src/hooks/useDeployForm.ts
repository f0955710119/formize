import { useAppDispatch } from "./useAppDispatch";
import { adminActions } from "../store/slice/adminSlice";
import { Settings, Styles } from "../types/form";
import { Question } from "../types/question";
import firebase from "../utils/firebase";
import { SettingContext } from "../store/context/settingContext";

const useDeployForm = () => {
  const dispatch = useAppDispatch();
  const sendFormDataHandler = async (sendingObj: {
    uid: string;
    groupId: string;
    settings: any;
    questions: Question[];
    styles: Styles;
    settingContextData: SettingContext;
  }) => {
    try {
      let startPageImageFile = null;
      let endPageImageFile = null;

      if (sendingObj.settingContextData.startPageImageFile !== null) {
        const startPageImageRef = firebase.getStorageRef(
          sendingObj.settingContextData.startPageImageFile.name
        );
        await firebase.uploadImage(
          startPageImageRef,
          sendingObj.settingContextData.startPageImageFile
        );

        startPageImageFile = await firebase.getStoredImages(startPageImageRef);
      }

      if (sendingObj.settingContextData.endPageImageFile !== null) {
        const endPageImageRef = firebase.getStorageRef(
          sendingObj.settingContextData.endPageImageFile.name
        );
        await firebase.uploadImage(
          endPageImageRef,
          sendingObj.settingContextData.endPageImageFile
        );
        endPageImageFile = await firebase.getStoredImages(endPageImageRef);
      }

      console.log(startPageImageFile);
      console.log(endPageImageFile);

      const newSendingObj = {
        ...sendingObj,
        settings: {
          ...sendingObj.settings,
          startPageImageFile,
          endPageImageFile,
        },
      };

      // deploy
      const response = await fetch("/api/admin/form", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newSendingObj),
      });
      const data = await response.json();
      alert(data.message);
      if (data.status !== "success") throw "上傳資料失敗";
      dispatch(adminActions.createNewFormId(data.data.formId));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return sendFormDataHandler;
};

export default useDeployForm;
