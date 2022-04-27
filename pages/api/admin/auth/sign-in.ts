import { NextApiRequest, NextApiResponse } from "next";
import firestoreCollectionConfig from "../../../../src/configs/firestoreCollectionConfig";
import { Surveys } from "../../../../src/types/survey";
import firebase from "../../../../src/utils/firebase";
import type { DocumentData } from "firebase/firestore";

interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {
    uid?: string;
    groups?: DocumentData[];
    surveys?: DocumentData[];
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^[A-Za-z\d]{6,}$/;

    const invalidEmailRegex = !emailRegex.test(email);
    const invalidPasswordRegex = !passwordRegex.test(password);

    if (invalidEmailRegex && invalidPasswordRegex) {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: "both email and password are invalid input",
      });
      return;
    }

    if (invalidEmailRegex) {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: "email has invalid input, please try again",
      });
      return;
    }

    if (invalidPasswordRegex) {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: "password has invalid input, please try again",
      });
      return;
    }

    try {
      const userData = await firebase
        .nativeLogin({ email, password })
        .catch((error) => {
          throw new Error("fail to pass native login: " + error.message);
        });
      if (!userData) {
        throw new Error("this account is not existed, please sign up");
      }
      const { id } = userData;
      const groupData = await firebase.getAllEqualDoc(
        firestoreCollectionConfig.GROUPS,
        "userId",
        id
      );
      const surveysList: string[] = [];
      groupData.forEach((d) => {
        surveysList.push(...d.surveys);
      });
      const fetchSurveysList = surveysList.map((surveyId) =>
        firebase.getDocData(firestoreCollectionConfig.SURVEYS, surveyId)
      );
      const surveys = await Promise.all(fetchSurveysList);

      res.status(200).json({
        status: "success",
        status_code: 200,
        message: "login successfully with user data back!",
        data: {
          uid: id,
          groups: groupData,
          surveys,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: error.message,
      });
    }
  }
}
