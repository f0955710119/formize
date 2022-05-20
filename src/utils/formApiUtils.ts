import { Question } from "../types/question";

export const generateQuestionsKeysForResponses = (questions: Question[]) => {
  const questionKeysConfig: { [key: string]: number } = {};
  const questionKeysType: { [key: string]: string } = {};

  let keyIndex = 0;
  questions.forEach((question) => {
    if (question.type === "2") return;
    if (
      question.type !== "5" &&
      question.type !== "8" &&
      question.type !== "9"
    ) {
      questionKeysConfig[question.id] = keyIndex;
      questionKeysType[question.id] = question.type;
      keyIndex++;
      return;
    }
    if (question.type === "9" && question.validations.multipleDate) {
      Array(2)
        .fill(null)
        .forEach((_, indexTime) => {
          const dateId =
            indexTime === 0 ? `${question.id}_start` : `${question.id}_end`;
          questionKeysConfig[dateId] = keyIndex;
          questionKeysType[dateId] = question.type;
          keyIndex++;
        });
      return;
    }

    Array(question?.options?.length)
      .fill(null)
      .forEach((_, indexOption) => {
        const optionId = `${question.id}_${indexOption}`;
        questionKeysConfig[optionId] = keyIndex;
        questionKeysType[optionId] = question.type;
        keyIndex++;
      });
  });

  return [questionKeysConfig, questionKeysType];
};

export const generateResponseTableInfoArr = (questions: Question[]) => {
  const questionsObject = generateQuestionsKeysForResponses(questions);
  const ids = Object.keys(questionsObject[1]);
  const types = Object.values(questionsObject[1]);
  const hasOptions: { [key: string]: string[] } = {};
  const hasMatrixs: { [key: string]: string[] } = {};
  const titles: { [key: string]: string } = {};

  questions.forEach((question) => {
    titles[question.id] = question.title;
    if (question.type === "5" && question.options && question.matrixs) {
      hasOptions[question.id] = question.options;
      hasMatrixs[question.id] = question.matrixs;
      return;
    }

    if (
      question.type === "8" ||
      question.type === "3" ||
      question.type === "4"
    ) {
      if (!question.options) return;
      hasOptions[question.id] = question.options;
    }
  });

  const tables = ids.map((id, i) => {
    const originalId = id.includes("_") ? id.split("_")[0] : id;
    const originTitle = titles[originalId];
    if (id.includes("_start") || id.includes("_end")) {
      const titleNote = id.includes("_start") ? "起始日" : "結束日";
      return {
        title: `${originTitle} (${titleNote})`,
        id,
        type: types[i],
      };
    }

    if (types[i] === "5") {
      const options = hasOptions[originalId];
      const matrixs = hasMatrixs[originalId];
      const optionIndex: number = +id.split("_")[1];
      return {
        title: `${originTitle} - ${options[optionIndex]}`,
        id,
        type: types[i],
        matrixs,
      };
    }

    if (types[i] === "8") {
      const options = hasOptions[originalId];
      const optionIndex = +id.split("_")[1];
      return {
        title: `${originTitle} - ${options[optionIndex]}`,
        id,
        type: types[i],
        options,
      };
    }

    if (types[i] === "3" || types[i] === "4") {
      const options = hasOptions[originalId];
      return {
        title: `${originTitle}`,
        id,
        type: types[i],
        options,
      };
    }

    return {
      title: `${originTitle}`,
      id,
      type: types[i],
    };
  });

  return tables;
};
