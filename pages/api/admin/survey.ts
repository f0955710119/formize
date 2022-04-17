// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../../src/utils/firebase";
import helper from "../../../src/utils/helper";
interface Data {
  status: string;
  status_code: number;
  message: string;
  data: {
    survey_id: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // console.log(req.body);
    const data = await firebase.getUserCertainGroupData();
    console.log(data);
    const surveyId = helper.generateId(8);
    res.status(201).json({
      status: "success",
      status_code: 201,
      message: "create new survey successfully",
      data: {
        survey_id: surveyId,
      },
    });
  }
}

/*

backgroundImages: ['']
endPageImageFile: null
endPageParagraph: ""
font: "1"
limitedAnswerTime: null
limitedResponseQuantity: null
mode: 1
pageQuantity: 1
questions: (3) [{…}, {…}, {…}]
startPageImageFile: null
startPageParagraph: ""
status: 0
theme: "1"
title: ""

*/
