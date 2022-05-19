import type { NextApiRequest, NextApiResponse } from "next";

import firestoreCollectionCongfig from "../../../../../src/configs/firestoreCollectionConfig";
import firebase from "../../../../../src/utils/firebase";

import {
  generateTableCounts,
  generateExtraDataOfNumberInputToDisplayStatis,
  generateTableStatis,
} from "../../../../../src/utils/controllerHelper";

interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {};
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const formId = req.query.formId as string;

      const form = await firebase.getDocData(
        firestoreCollectionCongfig.FORMS,
        formId
      );
      if (!form) throw new Error("問卷已不存在");

      const response = await firebase.getDocData(
        firestoreCollectionCongfig.RESPONSES,
        form.responseDocId
      );

      if (!response) throw new Error("問卷已不存在");

      const responsedTimesOfDiffernetAnswers = Array(
        response.tableInfo.length
      ).fill(0);

      const { tableInfo } = response;

      const tableCounts = generateTableCounts(
        tableInfo,
        response,
        responsedTimesOfDiffernetAnswers
      );

      const hasNoResponse = tableCounts.find((count) => count === "no-data");

      if (hasNoResponse) {
        res.status(200).json({
          status: "success",
          status_code: 200,
          message: "成功讀取問卷的回應",
          data: {
            tableStatis: null,
          },
        });
        return;
      }

      const extraDataOfNumberInputToDisplayStatis =
        generateExtraDataOfNumberInputToDisplayStatis(tableInfo, response);

      const tableStatis = generateTableStatis(
        tableCounts,
        extraDataOfNumberInputToDisplayStatis,
        responsedTimesOfDiffernetAnswers,
        response
      );

      res.status(200).json({
        status: "success",
        status_code: 200,
        message: "成功讀取問卷的回應",
        data: {
          tableStatis,
        },
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: error.message,
      });
    }
  }
}
