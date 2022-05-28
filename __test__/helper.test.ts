import "@testing-library/jest-dom";
import {
  testQuestionForSinglePage,
  testQuestionForMultiplePage,
  pageQuantity,
  testQuantityInDifferentPage,
  testIndexsForOnePageMode,
  testIntervalPoints,
  testConfigObject,
} from "./configs/helperConfig";
import helper from "../src/utils/helper";

const {
  updateCountNumbersOfQuestionPage,
  createQuestionsIntervalPointsForDifferentPages,
  createIndexsForQuestionsInDiffernetPages,
  generateQuestionIndexArr,
  generateId,
  checkExistedName,
  generateUpdateNames,
  generateConfigKeys,
  generateEnumConfig,
} = helper;

describe("Test general functions in helper.js", () => {
  test("Update the number in a new init array that records 0 for every pages to be the number of quantity of questions in different pages", () => {
    const expectResult = [3, 3, 5];
    const initQuantityInDifferentPage = Array(pageQuantity).fill(0);
    updateCountNumbersOfQuestionPage(testQuestionForMultiplePage, initQuantityInDifferentPage);
    expect(initQuantityInDifferentPage).toEqual(expect.arrayContaining(expectResult));
  });

  test("Create a new array that contains interval points that serve as the slice index to generate arrays that contain questions in different pages", () => {
    const expectResult = [0, 3, 6, 11];
    const newArrContainSliceIndexs = createQuestionsIntervalPointsForDifferentPages(
      testQuantityInDifferentPage
    );
    expect(newArrContainSliceIndexs).toEqual(expect.arrayContaining(expectResult));
  });

  test("Create an array that contains the title index to be the prefix number of a title of its question in different pages", () => {
    const expectResult = [
      ["1", "2", ""],
      ["3", "4", ""],
      ["5", "6", "7", "8", "9"],
    ];
    const titleIndexArr = createIndexsForQuestionsInDiffernetPages(
      testQuantityInDifferentPage,
      testIndexsForOnePageMode,
      testIntervalPoints
    );
    expect(titleIndexArr).toEqual(expect.arrayContaining(expectResult));
  });

  describe("Create an array that contains many unique title indexes for questions", () => {
    test("Under single page mode", () => {
      const newArrContainsIndex = generateQuestionIndexArr(testQuestionForSinglePage);
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
    });
    test("Under multiple page mode", () => {
      const newArrContainsIndex = generateQuestionIndexArr(testQuestionForMultiplePage);
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
    });
  });

  describe("Generate unique id with different length", () => {
    test("Length is equal to 8", () => {
      const newIdHasLength8 = generateId(8);
      expect(newIdHasLength8 !== "");
      expect(newIdHasLength8.length === 8);
      expect(newIdHasLength8).toMatch(/^[A-Za-z0-9]{8}$/);
    });
    test("Length is equal to 6", () => {
      const newIdHasLength6 = generateId(6);
      expect(newIdHasLength6 !== "");
      expect(newIdHasLength6.length === 6);
      expect(newIdHasLength6).toMatch(/^[A-Za-z0-9]{6}$/);
    });
    test("If a negative input", () => {
      const emptyString = generateId(-1);
      expect(emptyString === "");
    });
  });

  test("Generate an array that contains multiple subarrays. ", () => {
    const expectResult = [
      ["1", "2", ""],
      ["3", "4", ""],
      ["5", "6", "7", "8", "9"],
    ];
    const titleIndexArr = helper.generateQuestionMultiPageIndexArr(
      pageQuantity,
      testQuestionForMultiplePage
    );
    expect(titleIndexArr).toEqual(expect.arrayContaining(expectResult));
  });

  describe("Check if a string in an array has the same value equal to others in that array", () => {
    test("Has existing one", () => {
      const expectResult = true;
      const testCheckStringName = {
        stringArr: ["啤酒", "燒酒", "烈酒"],
        index: 2,
        editingText: "啤酒",
      };
      const hasSameString = checkExistedName(testCheckStringName);
      expect(hasSameString).toEqual(expectResult);
    });

    test("Has no existing one", () => {
      const expectResult = undefined;
      const testCheckStringName = {
        stringArr: ["啤酒", "燒酒", "烈酒"],
        index: 2,
        editingText: "超級烈酒",
      };
      const hasSameString = checkExistedName(testCheckStringName);
      expect(hasSameString).toEqual(expectResult);
    });

    test("If the string has space", () => {
      const expectResult = undefined;
      const testCheckStringName = {
        stringArr: ["啤酒", "燒酒", "烈酒"],
        index: 2,
        editingText: "啤酒 ",
      };
      const hasSameString = checkExistedName(testCheckStringName);
      expect(hasSameString).toEqual(expectResult);
    });
  });

  test("Update a string in an array", () => {
    const expectResult = ["啤酒", "燒酒", "超級烈酒"];
    const testCheckStringName = {
      stringArr: ["啤酒", "燒酒", "烈酒"],
      index: 2,
      editingText: "超級烈酒",
    };
    const updateStringArr = generateUpdateNames(testCheckStringName);
    expect(expectResult).toEqual(expect.arrayContaining(expectResult));
    expect(updateStringArr.length === expectResult.length);
  });

  test("Generate a new array that contains an object's values which are responsed to keys that include certain given string ", () => {
    const expectResult = ["0", "1", "2"];
    const fontConfigKeys = generateConfigKeys("_CODE", testConfigObject);
    expect(fontConfigKeys).toEqual(expect.arrayContaining(expectResult));
    expect(fontConfigKeys.length === expectResult.length);
  });

  test("Generate an object that its keys are enumerate numbers of the given string array's index and its value are the given string arr's value", () => {
    const expectResult = {
      0: "0",
      1: "1",
      2: "2",
    };
    const testingArr = ["0", "1", "2"];
    const newObject = generateEnumConfig(testingArr);
    expect(newObject).toMatchObject(expectResult);
  });
});
