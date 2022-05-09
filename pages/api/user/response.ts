import type { NextApiRequest, NextApiResponse } from "next";
import firestoreCollectionConfig from "../../../src/configs/firestoreCollectionConfig";
import firebase from "../../../src/utils/firebase";
import helper from "../../../src/utils/helper";

interface Data {
  status: string;
  status_code: number;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { answers, responseDocId, formId } = req.body;

      const data = await firebase
        .getDocData(firestoreCollectionConfig.FORMS, formId)
        .catch(() => {
          throw new Error("fail to get form data");
        });
      const responseData = await firebase
        .getDocData(firestoreCollectionConfig.RESPONSES, responseDocId)
        .catch(() => {
          throw new Error("fail to get response data");
        });
      if (!data) {
        res.status(400).json({
          status: "fail",
          status_code: 400,
          message: `this form has no data`,
        });
        return;
      }

      if (!responseData) {
        res.status(400).json({
          status: "fail",
          status_code: 400,
          message: `this response collection has no data`,
        });
        return;
      }

      if (data.settings.status !== "0") {
        res.status(403).json({
          status: "fail",
          status_code: 403,
          message: `you can not send responses to this form since the form has not been launched or has been closed`,
        });
        return;
      }

      const idForArrayUnqine = helper.generateId(8);

      const fetchList = [
        firebase.updateExistedDoc(
          firestoreCollectionConfig.FORMS,
          formId,
          "responsedTimes",
          data.responsedTimes + 1
        ),
        firebase.updateExistedDoc(
          firestoreCollectionConfig.FORMS,
          formId,
          "latestResponsedTime",
          new Date()
        ),
        firebase.updateFieldArrayValue({
          docPath: `${firestoreCollectionConfig.RESPONSES}/${responseDocId}`,
          fieldKey: "createdTime",
          updateData: { [idForArrayUnqine]: new Date() },
        }),
        firebase.updateExistResponseFields(
          firestoreCollectionConfig.RESPONSES,
          responseDocId,
          answers,
          idForArrayUnqine
        ),
      ];

      await Promise.all(fetchList).catch(() => {
        throw new Error("fail to update form and response collection");
      });

      res.status(201).json({
        status: "success",
        status_code: 201,
        message: `send response to ${formId} form`,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: `unexpected errors happened: ` + error.message,
      });
    }
  }
}
