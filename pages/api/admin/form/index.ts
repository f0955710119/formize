import type { NextApiRequest, NextApiResponse } from "next";

import firestoreCollectionCongfig from "../../../../src/configs/firestoreCollectionConfig";
import type { Forms } from "../../../../src/types/form";
import type { Answer, Table } from "../../../../src/types/responses";
import firebase from "../../../../src/utils/firebase";
import { generateResponseTableInfoArr } from "../../../../src/utils/formApiUtils";

const dotenv = require("dotenv");

dotenv.config();

const { GROUPS, FORMS, QUESTIONS, RESPONSES } = firestoreCollectionCongfig;
interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {
    url: string;
    formId: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const { uid, settings, questions, style, groupId } = req.body;
    if (uid === "") {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: "只有會員能產生新問卷",
      });
      return;
    }

    const neededDoc = [FORMS, QUESTIONS, RESPONSES];
    const [formDocRef, questionDocRef, responseDocRef] = neededDoc.map((collectionName) =>
      firebase.generateDocRef(collectionName)
    );
    const { id } = formDocRef;
    const { title } = settings;

    const url = `'${process.env.NEXT_PUBLIC_ORIGIN}/s/${id}`;
    const newFormDocData: Forms = {
      id,
      title,
      url,
      createdTime: new Date(),
      responsedTimes: 0,
      openTimes: 0,
      settings,
      style,
      questionDocId: questionDocRef.id,
      responseDocId: responseDocRef.id,
      groupId,
      latestResponsedTime: null,
    };
    const newQuestionDocData = {
      questions,
    };

    const tableInfo = generateResponseTableInfoArr(questions);
    const newDefaultResponssDocData: {
      [key: string]: string | Date[] | Answer[] | Table[] | never[];
    } = {
      formId: formDocRef.id,
      createdTime: [],
      tableInfo,
    };
    tableInfo.forEach((table: Table) => {
      const id = table.id as string;
      newDefaultResponssDocData[id] = [];
    });

    const updateGroupInfo = {
      docPath: `${GROUPS}/${groupId}`,
      fieldKey: "forms",
      updateData: formDocRef.id,
    };
    const fetchFirestore = [
      firebase.updateFieldArrayValue(updateGroupInfo),
      firebase.setNewDoc(formDocRef, newFormDocData),
      firebase.setNewDoc(questionDocRef, newQuestionDocData),
      firebase.setNewDoc(responseDocRef, newDefaultResponssDocData),
    ];

    await Promise.all(fetchFirestore);
    res.status(201).json({
      status: "success",
      status_code: 201,
      message: "create new form successfully",
      data: {
        url,
        formId: formDocRef.id,
      },
    });
  }

  if (req.method === "DELETE") {
    try {
      const uidRaw = req.headers.authorization;
      if (!uidRaw) throw new Error("只有管理員才能刪除問卷");
      const { formId } = req.body;
      if (!formId) throw new Error("查無此問卷");
      const formData = await firebase.getDocData(FORMS, formId);
      if (!formData) throw new Error("查無此問卷的資料");
      const { groupId, questionDocId, responseDocId, settings } = formData;
      const { startPageImageFile, endPageImageFile } = settings;
      if (!groupId || !questionDocId || !responseDocId)
        throw new Error("查無該問卷的相關資料，資料庫可能以缺少部分key值");

      const updateGroupInfo = {
        docPath: `${GROUPS}/${groupId}`,
        fieldKey: "forms",
        updateData: formId,
      };

      const promiseList = [
        firebase.updateFieldArrayValue(updateGroupInfo, false).catch(() => {
          throw new Error("刪除群組資料失敗");
        }),
        firebase.deleteDocDate(FORMS, formId).catch(() => {
          throw new Error("刪除問卷資料失敗");
        }),
        firebase.deleteDocDate(QUESTIONS, questionDocId).catch(() => {
          throw new Error("刪除題型資料失敗");
        }),
        firebase.deleteDocDate(RESPONSES, responseDocId).catch(() => {
          throw new Error("刪除回應資料失敗");
        }),
        firebase.deleteImage(startPageImageFile),
        firebase.deleteImage(endPageImageFile),
      ];

      await Promise.all(promiseList);

      res.status(200).json({
        status: "success",
        status_code: 200,
        message: "成功刪除問卷!",
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
