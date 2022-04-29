import type { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../../../../src/utils/firebase";
import firestoreCollectionCongfig from "../../../../../src/configs/firestoreCollectionConfig";
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

      const tableCounts = response.tableInfo.map(
        (table: {
          type: string;
          id: string;
          title: string;
          options?: string[];
          martixs?: string[];
        }) => {
          const rawData = response[table.id];
          const data = rawData.map((d: { [key: string]: string }) => {
            return Object.values(d).join("");
          });

          switch (table.type) {
            case "1": {
              return;
            }
            case "0":
            case "9": {
              const counts: { [key: string]: number } = {};
              data.forEach((d: string) => {
                if (d === "") return;
                counts[d] = (counts[d] || 0) + 1;
              });
              return counts;
            }

            case "3": {
              if (!table.options) {
                throw new Error("問卷題型有誤，選擇題不得沒有選項");
              }
              const counts = table.options.map((option) => {
                const countObj: { [key: string]: number | string } = {};
                countObj.option = option;
                countObj.times = 0;
                return countObj;
              });

              data.forEach((d: string) => {
                if (d === "") return;
                const splitedInput = d.split(".");
                const optionIndex = splitedInput[0];
                counts[+optionIndex].times =
                  (+counts[+optionIndex - 1].times || 0) + 1;
              });

              return counts;
            }
            case "4": {
              if (!table.options) {
                throw new Error("問卷題型有誤，選擇題不得沒有選項");
              }
              const counts = table.options.map((option) => {
                const countObj: { [key: string]: number | string } = {};
                countObj.option = option;
                countObj.times = 0;
                return countObj;
              });
              data.forEach((d: string) => {
                if (d === "") return;
                const splitedInputs = d.split("\n").slice(0, -1);
                splitedInputs.forEach((splitedInputString) => {
                  const splitedInput = splitedInputString.split(".");
                  const optionIndex = splitedInput[0];
                  counts[+optionIndex - 1].times =
                    (+counts[+optionIndex - 1].times || 0) + 1;
                });
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
              const martixCounts = table.martixs.map((martix) => {
                if (!counts[martix])
                  return {
                    martix,
                    times: 0,
                  };

                return {
                  martix,
                  times: counts[martix],
                };
              });

              return martixCounts;
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
              if (!table.options) {
                throw new Error("問卷題型有誤，排序題不得沒有選項");
              }

              const counts = table.options.map((option, i) => {
                const countObj: { [key: string]: number } = {};
                countObj[`排序${i + 1}`] = 0;
                return countObj;
              });
              counts.push({ 未被選取: 0 });

              data.forEach((d: string) => {
                if (d === "0") {
                  counts[`${(table.options as string[]).length}`]["未選"] =
                    (counts[`${(table.options as string[]).length}`]["未選"] ||
                      0) + 1;
                  return;
                }
                const dNumber = +d;
                counts[dNumber - 1][`排序${dNumber}`] =
                  (counts[dNumber - 1][`排序${dNumber}`] || 0) + 1;
              });
              return counts;
            }
            default: {
              throw new Error("問卷題型有誤，未發現對應的題型");
            }
          }
        }
      );

      const tableStatis = tableCounts.map(
        (
          table:
            | { [key: string]: string | number }[]
            | { [key: string]: string | number },
          i: number
        ) => {
          return {
            id: response.tableInfo[i].id,
            count: table,
          };
        }
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
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: error.message,
      });
    }
  }
}
