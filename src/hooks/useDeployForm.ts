import { useRouter } from "next/router";

import { useContext } from "react";

import adminActionType from "../store/actionType/adminActionType";
import { adminContext } from "../store/context/adminContext";
import { settingContext } from "../store/context/settingContext";
import { styleContext } from "../store/context/styleContext";
import { SendingFormData } from "../types/form";
import type { Question } from "../types/question";
import firebase from "../utils/firebase";
import sweetAlert from "../utils/sweetAlert";
import useAppSelector from "./useAppSelector";
import useSwitchCurrentStep from "./useSwitchCurrentStep";

type Image = string | null;

const checkHasUid = (uid: string, callback: () => void) => {
  if (uid !== "") return true;
  sweetAlert.clickToConfirmAlert(
    {
      title: "OOPS...",
      text: "非登入中的會員無法發佈問卷，若看到此訊息，請嘗試重新登入",
      cancelButtonText: "關閉視窗",
      confirmButtonText: "重回首頁",
    },
    callback
  );
  return false;
};

const checkHasQuestion = (questions: Question[]) => {
  if (questions.length === 0) {
    const imageUrl = `${process.env.NEXT_PUBLIC_ORIGIN}/images/send-empty-form.svg`;
    sweetAlert.onlyConfirmAlert({
      title: "OOPS...",
      text: "FORMiZE發現您還沒設定問題，\n趕緊關閉此視窗去設定題目，再來發佈吧!",
      confirmButtonText: "關閉視窗",
      imageUrl,
    });
    return false;
  }
  return true;
};

const getUploadImages = async (
  startPageImageFile: File | null,
  endPageImageFile: File | null
) => {
  const [newStartPageImageFile, newEndPageImageFile] = await Promise.all([
    firebase.createUploadedImages(startPageImageFile),
    firebase.createUploadedImages(endPageImageFile),
  ]);

  const startPageImage = newStartPageImageFile !== undefined ? newStartPageImageFile : null;
  const endPageImage = newEndPageImageFile !== undefined ? newEndPageImageFile : null;
  return [startPageImage, endPageImage] as Image[];
};

const sendFormRequest = async (formData: SendingFormData) => {
  const response = await fetch("/api/admin/form", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (data.status !== "success") throw new Error("上傳資料失敗,沒接收到成功的data回傳狀態");
  const { formId } = data.data;
  return "" + formId;
};

const useDeployForm = () => {
  const router = useRouter();
  const { questions } = useAppSelector((state) => state.question);
  const { uid, editingGroupId: groupId, setField } = useContext(adminContext);
  const style = useContext(styleContext);
  const settingContextData = useContext(settingContext);
  const { startPageImageFile, endPageImageFile } = settingContextData;

  const switchStepHanlder = useSwitchCurrentStep();

  const sendFormDataHandler = async () => {
    const hasUid = checkHasUid(uid, () => router.replace("/"));
    if (!hasUid) return;

    const hasQuestion = checkHasQuestion(questions);
    if (!hasQuestion) return;

    const successSendCallback = (formId: string) => {
      sweetAlert.loadedReminderAlert("成功發佈問卷!");
      setTimeout(() => {
        sweetAlert.closeAlert();
      }, 1500);
      switchStepHanlder(4);
      setField(adminActionType.NEW_FORM_ID, formId);
    };

    const postDataHandler = async () => {
      sweetAlert.loadingReminderAlert("正在發佈問卷中...");

      try {
        const [startPageImage, endPageImage] = await getUploadImages(
          startPageImageFile,
          endPageImageFile
        );

        const newSendingObj: SendingFormData = {
          uid,
          groupId,
          style,
          questions,
          settings: {
            ...settingContextData,
            startPageImageFile: startPageImage,
            endPageImageFile: endPageImage,
          },
        };

        const formId = await sendFormRequest(newSendingObj);
        successSendCallback(formId);
      } catch (error: any) {
        console.error(error.message);
        sweetAlert.errorReminderAlert("發佈問卷發生問題，請稍後再試");
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
