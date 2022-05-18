import type { NextApiRequest, NextApiResponse } from "next";

import firestoreCollectionConfig from "../../../src/configs/firestoreCollectionConfig";
import type { Settings, Styles } from "../../../src/types/form";
import type { Question } from "../../../src/types/question";
import firebase from "../../../src/utils/firebase";

interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {
    questions: Question[];
    responseDocId: string;
    settings: Settings;
    styles: Styles;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const formId = JSON.parse(req.body).formId;

    if (!formId) {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: "lack params: formId",
      });
      return;
    }
    const data = await firebase.getDocData(
      firestoreCollectionConfig.FORMS,
      formId
    );

    if (!data) {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: "no such form exists",
      });
      return;
    }

    const { questionDocId, responseDocId, settings, styles, openTimes } = data;

    const questions = await firebase.getDocData(
      firestoreCollectionConfig.QUESTIONS,
      questionDocId
    );

    if (!questions || !responseDocId || !settings || !styles) {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: "no such data exists",
      });
      return;
    }

    const existedQuestion = [...questions.questions];
    const existedSettings = settings as Settings;
    const existedStyles = styles as Styles;

    await firebase.updateExistedDoc(
      firestoreCollectionConfig.FORMS,
      formId,
      "openTimes",
      openTimes + 1
    );

    res.status(201).json({
      status: "success",
      status_code: 201,
      message: "show question successfully",
      data: {
        questions: existedQuestion,
        responseDocId,
        settings: existedSettings,
        styles: existedStyles,
      },
    });
  }
}
