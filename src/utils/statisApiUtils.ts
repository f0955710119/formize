import { DocumentData } from "firebase/firestore";
import { max, min, mean, median, mode } from "mathjs";

import type {
  TableInfoItem,
  TableCounts,
  ExtraNumericData,
  GeneralTableInfo,
  OptionTableInfo,
  MatrixTableInfo,
} from "../types/table";

const updateResponsedTimesOfDiffernetAnswers = (
  tableIndex: number,
  responsedTimesOfDiffernetAnswers: number[]
) =>
  (responsedTimesOfDiffernetAnswers[tableIndex] =
    responsedTimesOfDiffernetAnswers[tableIndex] + 1);

const updateCountObjOfMultipleLine = (
  counts: { [key: string]: string },
  data: string,
  index: number
) => (counts[`${index + 1}`] = data);

const generateCountStatisOfMultipleLine = (generalTableInfo: GeneralTableInfo) => {
  const { data, tableIndex, responsedTimesOfDiffernetAnswers } = generalTableInfo;
  const counts: { [key: string]: string } = {};
  data.forEach((d: string | null, i: number) => {
    if (d === "" || d === null) return;
    updateResponsedTimesOfDiffernetAnswers(tableIndex, responsedTimesOfDiffernetAnswers);
    updateCountObjOfMultipleLine(counts, d, i);
  });

  return counts;
};

const updateCountObjOfTextInput = (counts: { [key: string]: number }, data: string) =>
  (counts[data] = (counts[data] || 0) + 1);

const generateCountStatisOfTextInput = (generalTableInfo: GeneralTableInfo) => {
  const { data, tableIndex, responsedTimesOfDiffernetAnswers } = generalTableInfo;
  const counts: { [key: string]: number } = {};
  data.forEach((d: string | null) => {
    if (d === "" || d === null) return;

    updateResponsedTimesOfDiffernetAnswers(tableIndex, responsedTimesOfDiffernetAnswers);

    updateCountObjOfTextInput(counts, d);
  });

  return counts;
};

const createInitCountArr = (questionContent: string[]) => {
  return questionContent.map((content) => {
    const countObj: { [key: string]: number | string } = {};
    countObj.rowTitle = content;
    countObj.value = 0;
    return countObj;
  });
};

const generateOptionIndexInCounts = (data: string) => data.split(".")[0];

const updateCountObjOfContent = (counts: { [key: string]: number | string }[], index: number) =>
  (counts[index - 1].value = (+counts[index - 1].value || 0) + 1);

const generateCountStatisOfOneChoice = (optionTableInfo: OptionTableInfo) => {
  const { data, options, tableIndex, responsedTimesOfDiffernetAnswers } = optionTableInfo;
  if (!options) {
    console.error("問卷題型有誤，選擇題不得沒有選項");
    throw new Error("連接問卷失敗，請聯絡IT部門");
  }

  const counts = createInitCountArr(options);

  data.forEach((d: string | null) => {
    if (d === "" || d === null) return;
    updateResponsedTimesOfDiffernetAnswers(tableIndex, responsedTimesOfDiffernetAnswers);
    const optionIndex = generateOptionIndexInCounts(d);
    updateCountObjOfContent(counts, +optionIndex);
  });

  return counts;
};

const splitMultipleChoiceAnswerWithoutLastNewline = (data: string) =>
  data.split("\n").slice(0, -1);

const updateCountObjOfMultipleChoice = (
  counts: { [key: string]: string | number }[],
  data: string[]
) => {
  data.forEach((splitedInputString) => {
    const index = generateOptionIndexInCounts(splitedInputString);
    updateCountObjOfContent(counts, +index);
  });
};

const generateCountStatisOfMultipleChoice = (optionTableInfo: OptionTableInfo) => {
  const { data, options, tableIndex, responsedTimesOfDiffernetAnswers } = optionTableInfo;
  if (!options) {
    console.error("問卷題型有誤，選擇題不得沒有選項");
    throw new Error("連接問卷失敗，請聯絡IT部門");
  }
  const counts = createInitCountArr(options);

  data.forEach((d: string | null) => {
    if (d === "" || d === null) return;

    updateResponsedTimesOfDiffernetAnswers(tableIndex, responsedTimesOfDiffernetAnswers);

    const splitedInputs = splitMultipleChoiceAnswerWithoutLastNewline(d);
    updateCountObjOfMultipleChoice(counts, splitedInputs);
  });

  return counts;
};

const createMatrixCountMap = (counts: { [key: string]: number }, matrixs: string[]) => {
  return matrixs.map((matrix) => {
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
};

const generateCountStatisOfMatrix = (matrixTableInfo: MatrixTableInfo) => {
  const { data, matrixs, tableIndex, responsedTimesOfDiffernetAnswers } = matrixTableInfo;
  if (!matrixs) {
    console.error("問卷題型有誤，矩陣題不得沒有欄位指標");
    throw new Error("連接問卷失敗，請聯絡IT部門");
  }

  const counts: { [key: string]: number } = {};

  data.forEach((d: string | null) => {
    if (d === "" || d === null) return;
    updateResponsedTimesOfDiffernetAnswers(tableIndex, responsedTimesOfDiffernetAnswers);
    updateCountObjOfTextInput(counts, d);
  });

  const matrixCounts = createMatrixCountMap(counts, matrixs);

  return matrixCounts;
};

const updateResponsedTimesForNumberInput = (generalTableInfo: GeneralTableInfo) => {
  const { data, tableIndex, responsedTimesOfDiffernetAnswers } = generalTableInfo;
  data.forEach((d: string | null) => {
    if (d === "" || d === null) return;
    updateResponsedTimesOfDiffernetAnswers(tableIndex, responsedTimesOfDiffernetAnswers);
  });
};

const createHandledNumberdata = (data: [string | null]) => {
  const rawArr = data.map((d: string | null) => {
    if (d !== null) return d;
    return "";
  });

  return rawArr.filter((d: string) => d !== "").map((d: string) => +d);
};

type numberData = number | null;

const generateNumericDataOfNumberInput = (rawData: numberData[]) => {
  const filteredNumericData = rawData.filter((d) => d !== null);
  const data = filteredNumericData.length > 0 ? (filteredNumericData as number[]) : [0];
  const numberObj: { [key: string]: any } = {
    最大值: max(data),
    最小值: min(data),
    平均值: mean(data),
    中位數: median(data),
    眾數: mode(data).length > 1 ? mode(data).join(",") : mode(data).join(""),
  };
  return numberObj;
};

const createCountMapOfNumberInput = (numberObj: { [key: string]: any }) => {
  const numberKeys = Object.keys(numberObj);
  const numberValues = Object.values(numberObj);

  return numberKeys.map((key, i) => {
    return {
      rowTitle: key,
      value: numberValues[i],
    };
  });
};

const generateCountStatisOfNumberInput = (generalTableInfo: GeneralTableInfo) => {
  const { data } = generalTableInfo;
  updateResponsedTimesForNumberInput(generalTableInfo);
  const dataNumber = createHandledNumberdata(data);
  const numberObj = generateNumericDataOfNumberInput(dataNumber);
  const counts = createCountMapOfNumberInput(numberObj);
  return counts;
};

const createInitCountOfSlider = (optionsLength: number) => {
  return Array(optionsLength)
    .fill(null)
    .map((_, i: number) => {
      const countObj: { [key: string]: number | string } = {};
      countObj.rowTitle = `排序${i + 1}`;
      countObj.value = 0;
      return countObj;
    });
};

const updateUnselectedOptionOfCountObjOfSlider = (
  counts: { [key: string]: string | number }[]
) => (counts[counts.length - 1].value = (+counts[counts.length - 1].value || 0) + 1);

const updateSelectedOptionOfCountObjOfSlider = (
  counts: { [key: string]: string | number }[],
  data: string
) => {
  const dataOrder = +data;
  counts[dataOrder - 1].value = (+counts[dataOrder - 1].value || 0) + 1;
};

const generateCountStatisOfSlider = (optionTableInfo: OptionTableInfo) => {
  const { data, options, tableIndex, responsedTimesOfDiffernetAnswers } = optionTableInfo;
  if (!options) {
    console.error("問卷題型有誤，排序題不得沒有選項");
    throw new Error("連接問卷失敗，請聯絡IT部門");
  }

  const counts = createInitCountOfSlider(options.length);
  counts.push({ rowTitle: "未被選取", value: 0 });

  data.forEach((d: string | null) => {
    if (d === null) return;

    if (d === "0") {
      updateUnselectedOptionOfCountObjOfSlider(counts);
      return;
    }

    updateResponsedTimesOfDiffernetAnswers(tableIndex, responsedTimesOfDiffernetAnswers);

    updateSelectedOptionOfCountObjOfSlider(counts, d);
  });

  return counts;
};

const generateResponsedCountForDifferentQuestionType = (
  questionInfo: {
    questionType: string;
    options?: string[];
    matrixs?: string[];
  },
  tableInfo: {
    data: [string | null];
    index: number;
    responsedTimesOfDiffernetAnswers: number[];
  }
) => {
  const { questionType, options, matrixs } = questionInfo;
  const { data, index, responsedTimesOfDiffernetAnswers } = tableInfo;

  const generalTableInfo = {
    data,
    tableIndex: index,
    responsedTimesOfDiffernetAnswers,
  };

  const optionTableInfo = {
    ...generalTableInfo,
    options,
  };

  const matrixTableInfo = {
    ...generalTableInfo,
    matrixs,
  };

  const typeConfig: {
    [key: string]: () => TableCounts;
  } = {
    "0": () => generateCountStatisOfTextInput(generalTableInfo),
    "1": () => generateCountStatisOfMultipleLine(generalTableInfo),
    "3": () => generateCountStatisOfOneChoice(optionTableInfo),
    "4": () => generateCountStatisOfMultipleChoice(optionTableInfo),
    "5": () => generateCountStatisOfMatrix(matrixTableInfo),
    "6": () => generateCountStatisOfNumberInput(generalTableInfo),
    "7": () => generateCountStatisOfNumberInput(generalTableInfo),
    "8": () => generateCountStatisOfSlider(optionTableInfo),
    "9": () => generateCountStatisOfTextInput(generalTableInfo),
  };

  return typeConfig[questionType];
};

const createFlattedData = (rawData: any) =>
  rawData.map((d: { [key: string]: string | null }) => Object.values(d)[0]);

export const generateTableCounts = (
  tableInfo: TableInfoItem[],
  response: DocumentData,
  responsedTimesOfDiffernetAnswers: number[]
) => {
  return tableInfo.map((table: TableInfoItem, index: number) => {
    const { id, type, options, matrixs } = table;

    const rawData = response[id];
    const flattedData = createFlattedData(rawData);

    if (flattedData.length === 0) {
      return "no-data";
    }

    const questionInfo = {
      questionType: type,
      options,
      matrixs,
    };

    const tableInfo = {
      data: flattedData,
      index,
      responsedTimesOfDiffernetAnswers,
    };

    const generateResponsedCountCallback = generateResponsedCountForDifferentQuestionType(
      questionInfo,
      tableInfo
    );

    return generateResponsedCountCallback();
  });
};

const getFilterNumberInput = (tableInfo: TableInfoItem[]) =>
  tableInfo.filter((table: TableInfoItem) => table.type === "6" || table.type === "7");

export const generateExtraDataOfNumberInputToDisplayStatis = (
  tableInfo: TableInfoItem[],
  response: DocumentData
) => {
  const filteredNumberInput = getFilterNumberInput(tableInfo);

  return filteredNumberInput.map((table: TableInfoItem) => {
    const { id } = table;
    const rawData = response[id];
    const flattedData = createFlattedData(rawData);

    const counts: { [key: string]: number } = {};
    flattedData.forEach((d: string | null) => {
      if (d === "" || d === null) return;
      updateCountObjOfTextInput(counts, d);
    });

    return {
      [id]: counts,
    };
  });
};

export const generateTableStatis = (
  tableCounts: (TableCounts | "no-data")[],
  extraNumericData: ExtraNumericData,
  responsedTimesOfDiffernetAnswers: number[],
  response: DocumentData
) => {
  return tableCounts.map((count, i) => {
    const { tableInfo } = response;
    const { id } = tableInfo[i];

    const hasNumericExtraData = extraNumericData.find((data) => data[id]);

    const tableStatisObj = {
      ...tableInfo[i],
      count,
      hasAnswerQuantityText: `回覆筆數: ${responsedTimesOfDiffernetAnswers[i]}筆`,
    };

    return hasNumericExtraData
      ? {
          ...tableStatisObj,
          numericData: hasNumericExtraData[id],
        }
      : tableStatisObj;
  });
};
