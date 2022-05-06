import type { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../../../../src/utils/firebase";
import firestoreCollectionCongfig from "../../../../../src/configs/firestoreCollectionConfig";
import { max, min, mean, median, mode } from "mathjs";

interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {};
}

interface TableInfoItem {
  type: string;
  id: string;
  title: string;
  options?: string[];
  matrixs?: string[];
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

      // const test = response.tableInfo.map((table: TableInfoItem, i: number) => {
      //   const rawData = response[table.id];
      //   const data = rawData.map((d: { [key: string]: string }) => {
      //     const flattedValue = Object.values(d).join("");
      //     return flattedValue;
      //   });
      //   console.log("第" + i + "個");
      //   console.log(data);
      // });

      const tableCounts = response.tableInfo.map((table: TableInfoItem) => {
        const rawData = response[table.id];
        const data = rawData.map((d: { [key: string]: string }) => {
          const flattedValue = Object.values(d).join("");
          return flattedValue;
        });

        if (data.length === 0) {
          return "no-data";
        }

        switch (table.type) {
          case "1": {
            const counts: { [key: string]: string } = {};
            data.forEach((d: string, i: number) => {
              if (d === "") return;
              counts[`${i + 1}`] = d;
            });

            return counts;
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
              countObj.rowTitle = option;
              countObj.value = 0;
              return countObj;
            });

            data.forEach((d: string) => {
              if (d === "") return;
              const splitedInput = d.split(".");
              const optionIndex = splitedInput[0];
              counts[+optionIndex - 1].value =
                (+counts[+optionIndex - 1].value || 0) + 1;
            });

            return counts;
          }
          case "4": {
            if (!table.options) {
              throw new Error("問卷題型有誤，選擇題不得沒有選項");
            }
            const counts = table.options.map((option) => {
              const countObj: { [key: string]: number | string } = {};
              countObj.rowTitle = option;
              countObj.value = 0;
              return countObj;
            });
            data.forEach((d: string) => {
              if (d === "") return;
              const splitedInputs = d.split("\n").slice(0, -1);
              splitedInputs.forEach((splitedInputString) => {
                const splitedInput = splitedInputString.split(".");
                const optionIndex = splitedInput[0];
                counts[+optionIndex - 1].value =
                  (+counts[+optionIndex - 1].value || 0) + 1;
              });
            });

            return counts;
          }
          case "5": {
            if (!table.matrixs) {
              throw new Error("問卷題型有誤，矩陣題不得沒有欄位指標");
            }
            const counts: { [key: string]: number } = {};

            data.forEach((d: string) => {
              if (d === "") return;
              counts[d] = (counts[d] || 0) + 1;
            });

            const matrixCounts = table.matrixs.map((matrix) => {
              if (!counts[matrix])
                return {
                  rowTitle: matrix,
                  value: 0,
                };

              return {
                rowTitle: matrix,
                value: counts[matrix],
              };
            });

            return matrixCounts;
          }

          case "6":
          case "7": {
            const dataNumber = data
              .filter((d: string) => d !== "")
              .map((d: string) => +d);
            const numberObj = {
              最大值: max(dataNumber),
              最小值: min(dataNumber),
              平均值: mean(dataNumber),
              中位數: median(dataNumber),
              眾數:
                mode(dataNumber).length > 1
                  ? mode(dataNumber).join(",")
                  : mode(dataNumber).join(""),
            };

            const numberKeys = Object.keys(numberObj);
            const numberValues = Object.values(numberObj);

            return numberKeys.map((key, i) => {
              return {
                rowTitle: key,
                value: numberValues[i],
              };
            });
          }

          case "8": {
            if (!table.options) {
              throw new Error("問卷題型有誤，排序題不得沒有選項");
            }

            const counts = table.options.map((option, i) => {
              const countObj: { [key: string]: number | string } = {};
              countObj.rowTitle = `排序${i + 1}`;
              countObj.value = 0;
              return countObj;
            });
            counts.push({ rowTitle: "未被選取", value: 0 });

            data.forEach((d: string) => {
              if (d === "0") {
                counts[counts.length - 1].value =
                  (+counts[counts.length - 1].value || 0) + 1;
                return;
              }
              const dNumber = +d;
              counts[dNumber - 1].value = (+counts[dNumber - 1].value || 0) + 1;
            });
            console.log(counts);
            return counts;
          }
          default: {
            throw new Error("問卷題型有誤，未發現對應的題型");
          }
        }
      });
      const hasNoResponse = tableCounts.find(
        (count: TableInfoItem | string) => count === "no-data"
      );

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

      const tableCountsForNumericData = response.tableInfo.filter(
        (table: TableInfoItem) => table.type === "6" || table.type === "7"
      );

      const numericExtraDataForDisplay = tableCountsForNumericData.map(
        (table: TableInfoItem) => {
          const rawData = response[table.id];

          const data = rawData.map((d: { [key: string]: string }) => {
            return Object.values(d).join("");
          });

          const counts: { [key: string]: number } = {};
          data.forEach((d: string) => {
            if (d === "") return;
            counts[d] = (counts[d] || 0) + 1;
          });
          return {
            [table.id]: counts,
          };
        }
      );

      const tableStatis = tableCounts.map(
        (
          table:
            | { [key: string]: string | number }[]
            | { [key: string]: string | number },
          i: number
        ) => {
          const id = response.tableInfo[i].id;
          const title = response.tableInfo[i].title;
          const type = response.tableInfo[i].type;
          const hasNumericExtraData = numericExtraDataForDisplay.find(
            (data: {
              [key: string]: {
                [key: string]: number;
              };
            }) => data[response.tableInfo[i].id]
          );

          const tableStatisObj = {
            id,
            title,
            type,
            count: table,
          };

          return hasNumericExtraData
            ? {
                ...tableStatisObj,
                numericData: hasNumericExtraData[id],
              }
            : tableStatisObj;
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
      console.log(error.message);
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: error.message,
      });
    }
  }
}
