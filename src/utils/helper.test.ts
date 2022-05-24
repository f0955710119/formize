import "@testing-library/jest-dom";
import {
  testQuestionForSinglePage,
  testQuestionForMultiplePage,
  pageQuantity,
  testQuantityInDifferentPage,
  testIndexsForOnePageMode,
  testIntervalPoints,
} from "../configs/testConfig";
import { Question } from "../types/question";
import helper from "./helper";

const {
  updateCountNumbersOfQuestionPage,
  createQuestionsIntervalPointsForDifferentPages,
  createIndexsForQuestionsInDiffernetPages,
  generateQuestionIndexArr,
  generateId,
} = helper;

describe("test general functions in helper.js", () => {
  describe("all functions contained in generateQuestionMultiPageIndexArr in helper.js", () => {
    test("update the number in a new init array that records 0 for every pages to be the number of quantity of questions in different pages", () => {
      const initQuantityInDifferentPage = Array(pageQuantity).fill(0);
      updateCountNumbersOfQuestionPage(
        testQuestionForMultiplePage,
        initQuantityInDifferentPage
      );
      expect(initQuantityInDifferentPage[0] === 3);
      expect(initQuantityInDifferentPage[1] === 3);
      expect(initQuantityInDifferentPage[2] === 5);
    });

    test("create a new array that contains interval points that serve as the slice index to generate arrays that contain questions in different pages", () => {
      const newArrContainSliceIndexs = createQuestionsIntervalPointsForDifferentPages(
        testQuantityInDifferentPage
      );
      expect(newArrContainSliceIndexs[0] === 0);
      expect(newArrContainSliceIndexs[1] === 3);
      expect(newArrContainSliceIndexs[2] === 6);
      expect(newArrContainSliceIndexs[3] === 11);
    });

    test("create an array that contains the title index to be the prefix number of a title of its question in different pages", () => {
      const titleIndexArr = createIndexsForQuestionsInDiffernetPages(
        testQuantityInDifferentPage,
        testIndexsForOnePageMode,
        testIntervalPoints
      );
      expect(titleIndexArr[0][0] === "1");
      expect(titleIndexArr[0][1] === "2");
      expect(titleIndexArr[1][0] === "3");
      expect(titleIndexArr[1][1] === "4");
      expect(titleIndexArr[2][0] === "5");
      expect(titleIndexArr[2][1] === "6");
      expect(titleIndexArr[2][2] === "7");
      expect(titleIndexArr[2][3] === "8");
      expect(titleIndexArr[2][4] === "9");
    });

    describe("create an array that contains many unique title indexes for questions", () => {
      const testGenerateQuestionIndexArr = (questions: Question[]) => {
        const newArrContainsIndex = generateQuestionIndexArr(questions);
        const filteredEmptyIndex = newArrContainsIndex.filter((index) => index !== "");
        const { length } = filteredEmptyIndex;
        const lengthForSet = [...new Set(filteredEmptyIndex)].length;
        expect(length === 9);
        expect(lengthForSet === 9);
        Array(9)
          .fill(null)
          .forEach((_, i) => {
            expect(filteredEmptyIndex[i] === `${i}+1`);
          });
      };

      test("under single page mode", () => {
        testGenerateQuestionIndexArr(testQuestionForSinglePage);
      });
      test("under multiple page mode", () => {
        testGenerateQuestionIndexArr(testQuestionForMultiplePage);
      });
    });
  });

  describe("can generate unique id with different length", () => {
    const testGenerateId = (length: number) => {
      const idRegex = /^[A-Za-z0-9]+$/;
      const newIdHasLength8 = generateId(length);
      expect(newIdHasLength8 !== "");
      expect(newIdHasLength8.length === length);
      expect(idRegex.test(newIdHasLength8) === true);
    };
    test("length equal to 8", () => {
      testGenerateId(8);
    });
    test("length equal to 6", () => {
      testGenerateId(6);
    });
  });
});
