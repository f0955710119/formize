// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import firestoreCollectionConfig from "../../../src/configs/firestoreCollectionConfig";
import firebase from "../../../src/utils/firebase";
import { Question } from "../../../src/types/question";
import { Settings, Styles } from "../../../src/types/survey";

//  BUG:這邊完全不知道自己在幹麻
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
    // const { surveyId } = req.query;
    const surveyId = JSON.parse(req.body).surveyId;
    console.log(req.body);
    if (!surveyId) {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: "lack params: surveyId",
      });
      return;
    }
    const data = await firebase.getDocData(
      firestoreCollectionConfig.SURVEYS,
      surveyId
    );

    if (!data) {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: "no such survey exists",
      });
      return;
    }

    const { questionDocId, responseDocId, settings, styles } = data;

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

    console.log(responseDocId);

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
