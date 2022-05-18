import type { NextApiRequest, NextApiResponse } from "next";

import type { DocumentData } from "firebase/firestore";

import firestoreCollectionConfig from "../../../../src/configs/firestoreCollectionConfig";
import firebase from "../../../../src/utils/firebase";

interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {
    groups?: DocumentData[];
    forms?: DocumentData[];
    groupId?: string;
    createdTime?: Date;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const uidRaw = req.headers.authorization;
      if (!uidRaw) throw new Error("need admin's id to get group data back");
      const uid = uidRaw.split(" ")[1];

      const groupData = await firebase
        .getAllEqualDoc(firestoreCollectionConfig.GROUPS, "adminId", uid)
        .catch(() => {
          throw new Error("取得群組資料失敗");
        });

      if (groupData.length === 0) {
        res.status(200).json({
          status: "success",
          status_code: 200,
          message:
            "return emtpy group list and forms since admin have not created groups yet",
        });
        return;
      }

      const formsList: string[] = [];
      groupData.forEach((d) => {
        formsList.push(...d.forms);
      });

      if (formsList[0] === "") {
        res.status(200).json({
          status: "success",
          status_code: 200,
          message: "get admin's group and form data back!",
          data: {
            groups: groupData,
          },
        });
        return;
      }

      const fetchFormsList = formsList.map((formId) =>
        firebase.getDocData(firestoreCollectionConfig.FORMS, formId)
      );
      const forms = await Promise.all(fetchFormsList);

      res.status(200).json({
        status: "success",
        status_code: 200,
        message: "get admin's group and form data back!",
        data: {
          groups: groupData,
          forms,
        },
      });
    } catch (error: any) {
      const { message } = error;
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message,
      });
    }
  }

  if (req.method === "POST") {
    try {
      const uidRaw = req.headers.authorization;
      console.log(uidRaw);
      if (!uidRaw) throw new Error("使用者必須登入才能新增群組");
      const { newGroupName } = req.body;
      if (!newGroupName)
        throw new Error("fail to add a group, need new group name");

      const uid = uidRaw.split(" ")[1];

      const groupDoc = firebase.generateDocRef("groups");
      const createdTime = new Date();
      const newGroupData = {
        id: groupDoc.id,
        adminId: uid,
        name: newGroupName,
        forms: [],
        createdTime,
      };

      const createNewGroupAjaxList = [
        firebase.updateUserGroupsIdArray(uid, groupDoc.id, true).catch(() => {
          throw new Error("fail to update new group in users");
        }),
        firebase.setNewDoc(groupDoc, newGroupData).catch(() => {
          throw new Error("fail to create new group in groups");
        }),
      ];

      await Promise.all(createNewGroupAjaxList);

      res.status(201).json({
        status: "success",
        status_code: 201,
        message: "create new group successfully!",
        data: {
          groupId: groupDoc.id,
          createdTime,
        },
      });
    } catch (error: any) {
      const { message } = error;
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message,
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const uidRaw = req.headers.authorization;
      if (!uidRaw) throw new Error("使用者必須登入才能刪除群組");
      const { groupId } = req.body;
      if (!groupId) throw new Error("缺乏群組資料");

      const uid = uidRaw.split(" ")[1];

      const groupData = await firebase.getDocData(
        firestoreCollectionConfig.GROUPS,
        groupId
      );

      if (groupData.forms.length === 0) {
        const promiseList = [
          firebase
            .updateFieldArrayValue(
              {
                docPath: `${firestoreCollectionConfig.USERS}/${uid}`,
                fieldKey: "groupId",
                updateData: groupId,
              },
              false
            )
            .catch(() => {
              throw new Error("刪除使用者資料失敗");
            }),
          firebase.deleteDocDate(firestoreCollectionConfig.GROUPS, groupId),
        ];
        await Promise.all(promiseList);
        res.status(200).json({
          status: "fail",
          status_code: 200,
          message: "成功刪除問卷的資料!",
        });
        return;
      }

      const formList = await Promise.all(
        groupData.forms.map((form: string) =>
          firebase.getDocData(firestoreCollectionConfig.FORMS, form)
        )
      );

      const generateFirebasePromise = () => {
        const promiseList = [];
        formList.forEach((form, i) => {
          promiseList.push(
            firebase
              .deleteDocDate(firestoreCollectionConfig.FORMS, form.id)
              .catch(() => {
                throw new Error("刪除問卷資料失敗");
              })
          );
          promiseList.push(
            firebase
              .deleteDocDate(
                firestoreCollectionConfig.QUESTIONS,
                form.questionDocId
              )
              .catch(() => {
                throw new Error("刪除題型資料失敗");
              })
          );
          promiseList.push(
            firebase
              .deleteDocDate(
                firestoreCollectionConfig.RESPONSES,
                form.responseDocId
              )
              .catch(() => {
                throw new Error("刪除回應資料失敗");
              })
          );

          if (i === formList.length - 1) {
            promiseList.push(
              firebase
                .deleteDocDate(firestoreCollectionConfig.GROUPS, groupId)
                .catch(() => {
                  throw new Error("刪除群組資料失敗");
                })
            );
          }
        });

        promiseList.push(
          firebase
            .updateFieldArrayValue(
              {
                docPath: `${firestoreCollectionConfig.USERS}/${uid}`,
                fieldKey: "groupId",
                updateData: groupId,
              },
              false
            )
            .catch(() => {
              throw new Error("刪除使用者資料失敗");
            })
        );
        return promiseList;
      };

      const promiseList = generateFirebasePromise();

      await Promise.all(promiseList).catch(() => {
        throw new Error("刪除群組內部所有資料時發生錯誤");
      });

      res.status(200).json({
        status: "fail",
        status_code: 200,
        message: "成功刪除問卷的所有資料!",
      });
    } catch (error: any) {
      const { message } = error;
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message,
      });
    }
  }
}
