import { useRouter } from "next/router";

import { SettingContext } from "../store/context/settingContext";
import { adminActions } from "../store/slice/adminSlice";
import { Styles } from "../types/form";
import { Question } from "../types/question";
import firebase from "../utils/firebase";
import sweetAlert from "../utils/sweetAlert";
import useAppDispatch from "./useAppDispatch";
import useSwitchCurrentStep from "./useSwitchCurrentStep";

const useDeployForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const switchStepHanlder = useSwitchCurrentStep();
  const sendFormDataHandler = async (sendingObj: {
    uid: string;
    groupId: string;
    settings: any;
    questions: Question[];
    styles: Styles;
    settingContextData: SettingContext;
  }) => {
    const { uid, settings, questions, settingContextData } = sendingObj;

    if (uid === "") {
      sweetAlert.clickToConfirmAlert(
        {
          title: "OOPS...",
          text: "非登入中的會員無法發佈問卷，若看到此訊息，請嘗試重新登入",
          cancelButtonText: "關閉視窗",
          confirmButtonText: "重回首頁",
        },
        () => {
          router.replace("/");
        }
      );
      return;
    }

    if (questions.length === 0) {
      sweetAlert.onlyConfirmAlert({
        title: "OOPS...",
        text: "FORMiZE發現您還沒設定問題，\n趕緊關閉此視窗去設定題目，再來發佈吧!",
        confirmButtonText: "關閉視窗",
        imageUrl: `${process.env.NEXT_PUBLIC_ORIGIN}/images/send-empty-form.svg`,
      });
      return;
    }

    const postDataHandler = async () => {
      try {
        sweetAlert.loadingReminderAlert("正在發佈問卷中...");
        let startPageImageFile = null;
        let endPageImageFile = null;

        if (settingContextData.startPageImageFile !== null) {
          const startPageImageRef = firebase.getStorageRef(
            settingContextData.startPageImageFile.name
          );
          await firebase.uploadImage(
            startPageImageRef,
            settingContextData.startPageImageFile
          );

          startPageImageFile = await firebase.getStoredImages(
            startPageImageRef
          );
        }

        if (settingContextData.endPageImageFile !== null) {
          const endPageImageRef = firebase.getStorageRef(
            settingContextData.endPageImageFile.name
          );
          await firebase.uploadImage(
            endPageImageRef,
            settingContextData.endPageImageFile
          );
          endPageImageFile = await firebase.getStoredImages(endPageImageRef);
        }

        const newSendingObj = {
          ...sendingObj,
          settings: {
            ...settings,
            startPageImageFile,
            endPageImageFile,
          },
        };

        const response = await fetch("/api/admin/form", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newSendingObj),
        });
        const data = await response.json();
        if (data.status !== "success") throw "上傳資料失敗";
        sweetAlert.loadedReminderAlert("成功發佈問卷!");
        setTimeout(() => {
          sweetAlert.closeAlert();
        }, 1500);
        dispatch(adminActions.createNewFormId(data.data.formId));
        switchStepHanlder(4);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    sweetAlert.clickToConfirmAlert(
      {
        title: "發佈前通知",
        text: "辛苦您製作了一份精美的問卷！\n確定要發佈它了嗎?",
        cancelButtonText: "還想修改",
        confirmButtonText: "確認送出",
        imageUrl: `${process.env.NEXT_PUBLIC_ORIGIN}/images/comfirm-deploy.svg`,
      },
      postDataHandler
    );
  };

  return sendFormDataHandler;
};

export default useDeployForm;
