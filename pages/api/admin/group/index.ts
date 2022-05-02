import type { NextApiRequest, NextApiResponse } from "next";
import firestoreCollectionConfig from "../../../../src/configs/firestoreCollectionConfig";
import firebase from "../../../../src/utils/firebase";
import type { DocumentData } from "firebase/firestore";

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
      const uid = req.headers.authorization;
      if (!uid) throw new Error("need admin's id to get group data back");

      const groupData = await firebase.getAllEqualDoc(
        firestoreCollectionConfig.GROUPS,
        "adminId",
        uid
      );

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
      const uid = req.headers.authorization;
      if (!uid) throw new Error("need admin's id to create new group data");
      const { newGroupName } = req.body;

      if (!newGroupName)
        throw new Error("fail to add a group, need new group name");

      const groupDoc = firebase.generateDocRef("groups");
      const createdTime = new Date();
      const newGroupData = {
        id: groupDoc.id,
        adminId: uid,
        name: newGroupName,
        forms: [],
        createdTime,
      };
      // BUG:用泛型判斷時，用|還是沒辦法自動去知道它可能屬於哪一種
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
}
