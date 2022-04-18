// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Surveys } from "../../../src/types/survey";
import firebase from "../../../src/utils/firebase";
import firestoreCollectionCongfig from "../../../src/configs/firestoreCollectionConfig";
import helper from "../../../src/utils/helper";

const dotenv = require("dotenv");
dotenv.config();
interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {
    url: string;
    survey_id: string;
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
        message: "only admin can add new survey",
      });
      return;
    }

    const neededDoc = [
      firestoreCollectionCongfig.SURVEYS,
      firestoreCollectionCongfig.QUESTIONS,
      firestoreCollectionCongfig.RESPONSES,
    ];

    const [surveyDocRef, questionDocRef, responseDocRef] = neededDoc.map(
      (collectionName) => firebase.generateDocRef(collectionName)
    );

    const url = `'${process.env.NEXT_PUBLIC_ORIGIN}/s/${surveyDocRef.id}`;
    const newHandledQuestions = helper.generateNewHandledQuestion(questions);
    const newSurveyDocData: Surveys = {
      title: settings.title,
      url,
      createdTime: new Date(),
      responsedTimes: 0,
      openTimes: 0,
      settings,
      styles,
      questionDocId: questionDocRef.id,
      responseDocId: responseDocRef.id,
    };
    const newQuestionDocData = {
      questions: newHandledQuestions,
    };
    const newDefaultResponssDocData = {
      exists: true,
    };

    const fetchFirestore = [
      firebase.updateFieldArrayValue({
        docPath: `${firestoreCollectionCongfig.GROUPS}/${groupId}`,
        fieldKey: "surveys",
        updateData: surveyDocRef.id,
      }),
      firebase.setNewDoc(surveyDocRef, newSurveyDocData),
      firebase.setNewDoc(questionDocRef, newQuestionDocData),
      firebase.setNewDoc(responseDocRef, newDefaultResponssDocData),
    ];

    await Promise.all(fetchFirestore);

    res.status(201).json({
      status: "success",
      status_code: 201,
      message: "create new survey successfully",
      data: {
        url,
        survey_id: surveyDocRef.id,
      },
    });
  }
}
