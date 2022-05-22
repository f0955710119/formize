import firestoreCollectionConfig from "../configs/firestoreCollectionConfig";
import { Forms } from "../types/form";
import firebase from "./firebase";

const { USERS, GROUPS, FORMS, QUESTIONS, RESPONSES } = firestoreCollectionConfig;

export const generatePromiseOfDeleteGroupWithNoForms = (uid: string, groupId: string) => {
  const updateUserInfo = {
    docPath: `${USERS}/${uid}`,
    fieldKey: "groupId",
    updateData: groupId,
  };
  const promiseList = [
    firebase.updateFieldArrayValue(updateUserInfo, false).catch(() => {
      throw new Error("刪除使用者資料失敗");
    }),
    firebase.deleteDocDate(GROUPS, groupId),
  ];

  return promiseList;
};

export const generatePromiseOfDeleteGroupWithForms = (
  uid: string,
  groupId: string,
  forms: Forms[]
) => {
  const promiseList = [];
  forms.forEach((form, i) => {
    const { id, questionDocId, responseDocId, settings } = form;
    const { startPageImageFile, endPageImageFile } = settings;

    promiseList.push(
      firebase.deleteDocDate(FORMS, id).catch(() => {
        throw new Error("刪除問卷資料失敗");
      })
    );
    promiseList.push(
      firebase.deleteDocDate(QUESTIONS, questionDocId).catch(() => {
        throw new Error("刪除題型資料失敗");
      })
    );
    promiseList.push(
      firebase.deleteDocDate(RESPONSES, responseDocId).catch(() => {
        throw new Error("刪除回應資料失敗");
      })
    );

    if (startPageImageFile !== null) {
      promiseList.push(
        firebase.deleteImage(startPageImageFile).catch(() => {
          throw new Error("刪除問卷歡迎頁照片失敗");
        })
      );
    }

    if (endPageImageFile !== null) {
      promiseList.push(
        firebase.deleteImage(endPageImageFile).catch(() => {
          throw new Error("刪除問卷結束頁照片失敗");
        })
      );
    }

    if (i === forms.length - 1) {
      promiseList.push(
        firebase.deleteDocDate(GROUPS, groupId).catch(() => {
          throw new Error("刪除群組資料失敗");
        })
      );
    }
  });

  const updateUserInfo = {
    docPath: `${USERS}/${uid}`,
    fieldKey: "groupId",
    updateData: groupId,
  };

  promiseList.push(
    firebase.updateFieldArrayValue(updateUserInfo, false).catch(() => {
      throw new Error("刪除使用者資料失敗");
    })
  );
  return promiseList;
};
