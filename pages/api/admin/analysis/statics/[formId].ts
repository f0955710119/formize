import type { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../../../../src/utils/firebase";
import firestoreCollectionCongfig from "../../../../../src/configs/firestoreCollectionConfig";
import helper from "../../../../../src/utils/helper";
import { max, min, mean, median } from "mathjs";

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

      const tableStatics = response.tableInfo.map(
        (table: {
          type: string;
          id: string;
          title: string;
          options?: string[];
          martixs?: string[];
        }) => {
          const data = response[table.id];
          switch (table.type) {
            case "0":
            case "9": {
              const counts: { [key: string]: number } = {};
              data.forEach((d: string) => {
                if (d === "") return;
                counts[d] = (counts[d] || 0) + 1;
              });
              return counts;
            }

            case "3":
            case "4": {
              if (!table.options) {
                throw new Error("問卷題型有誤，選擇題不得沒有選項");
              }
              const counts = table.options.map((option) => {
                const countObj: { [key: string]: number | string } = {};
                countObj[option] = option;
                return countObj;
              });
              data.forEach((d: string) => {
                if (d === "") return;
                const splitedInput = d.split(".");
                const optionIndex = splitedInput[0];
                const optionName = splitedInput[1];
                counts[+optionIndex][optionName] =
                  (+counts[+optionIndex][optionName] || 0) + 1;
              });
              return counts;
            }
            case "5": {
              if (!table.martixs) {
                throw new Error("問卷題型有誤，矩陣題不得沒有欄位指標");
              }
              const counts: { [key: string]: number } = {};

              data.forEach((d: string) => {
                if (d === "") return;
                counts[d] = (counts[d] || 0) + 1;
              });

              return counts;
            }

            case "6":
            case "7": {
              const dataNumber = data
                .filter((d: string) => d !== "")
                .map((d: string) => +d);
              return {
                max: max(dataNumber),
                min: min(dataNumber),
                mean: mean(dataNumber),
                median: median(dataNumber),
              };
            }

            case "8": {
              const counts: { [key: string]: number } = {};
              data.forEach((d: string) => {
                if (d === "") {
                  counts["未選"] = (counts["未選"] || 0) + 1;
                  return;
                }
                counts[d] = (counts[d] || 0) + 1;
              });
              return counts;
            }
            default: {
              throw new Error("問卷題型有誤，未發現對應的題型");
            }
          }
        }
      );

      res.status(200).json({
        status: "success",
        status_code: 200,
        message: "成功讀取問卷的回應",
        data: {
          tableStatics,
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
