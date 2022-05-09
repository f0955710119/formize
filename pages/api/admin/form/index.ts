import type { NextApiRequest, NextApiResponse } from "next";
import type { Forms } from "../../../../src/types/form";
import firebase from "../../../../src/utils/firebase";
import firestoreCollectionCongfig from "../../../../src/configs/firestoreCollectionConfig";
import helper from "../../../../src/utils/helper";
import { Answer, Table } from "../../../../src/types/responses";

const dotenv = require("dotenv");
dotenv.config();
interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {
    url: string;
    formId: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { uid, settings, questions, styles, groupId } = req.body;

    if (uid === "") {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: "only admin can add new form",
      });
      return;
    }

    const neededDoc = [
      firestoreCollectionCongfig.FORMS,
      firestoreCollectionCongfig.QUESTIONS,
      firestoreCollectionCongfig.RESPONSES,
    ];

    const [formDocRef, questionDocRef, responseDocRef] = neededDoc.map(
      (collectionName) => firebase.generateDocRef(collectionName)
    );

    const url = `'${process.env.NEXT_PUBLIC_ORIGIN}/s/${formDocRef.id}`;
    const newHandledQuestions = helper.generateNewHandledQuestion(questions);
    const newFormDocData: Forms = {
      id: formDocRef.id,
      title: settings.title,
      url,
      createdTime: new Date(),
      responsedTimes: 0,
      openTimes: 0,
      settings,
      styles,
      questionDocId: questionDocRef.id,
      responseDocId: responseDocRef.id,
      groupId,
      latestResponsedTime: null,
    };
    const newQuestionDocData = {
      questions: newHandledQuestions,
    };

    const tableInfo = helper.generateResponseTableInfoArr(questions);

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

    const fetchFirestore = [
      firebase.updateFieldArrayValue({
        docPath: `${firestoreCollectionCongfig.GROUPS}/${groupId}`,
        fieldKey: "forms",
        updateData: formDocRef.id,
      }),
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

      const formData = await firebase.getDocData(
        firestoreCollectionCongfig.FORMS,
        formId
      );
      if (!formData) throw new Error("查無此問卷的資料");
      const promiseList = [
        firebase
          .updateFieldArrayValue(
            {
              docPath: `${firestoreCollectionCongfig.GROUPS}/${formData.groupId}`,
              fieldKey: "forms",
              updateData: formId,
            },
            false
          )
          .catch(() => {
            throw new Error("刪除群組資料失敗");
          }),
        firebase
          .deleteDocDate(firestoreCollectionCongfig.FORMS, formId)
          .catch(() => {
            throw new Error("刪除問卷資料失敗");
          }),
        firebase
          .deleteDocDate(
            firestoreCollectionCongfig.QUESTIONS,
            formData.questionDocId
          )
          .catch(() => {
            throw new Error("刪除題型資料失敗");
          }),
        firebase
          .deleteDocDate(
            firestoreCollectionCongfig.RESPONSES,
            formData.responseDocId
          )
          .catch(() => {
            throw new Error("刪除回應資料失敗");
          }),
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
