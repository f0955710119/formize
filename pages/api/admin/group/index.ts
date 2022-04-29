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
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.body.newGroupName) {
    console.log(req.body.newGroupName);
    return;
  }
  if (req.method === "POST") {
    try {
      const { uid } = req.body;
      if (!uid)
        throw new Error("need admin's id as param to get group data back");

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
}
