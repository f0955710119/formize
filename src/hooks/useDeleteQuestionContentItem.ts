import questionConfig from "../configs/questionConfig";
import { questionActions } from "../store/slice/questionSlice";
import sweetAlert from "../utils/sweetAlert";
import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";

interface ContentType {
  minQuantity: string;
  typeName: string;
  uniqueCondition: boolean;
}

const useDeleteQuestionContentItem = (contentType: string) => {
  const dispatch = useAppDispatch();

  const {
    isEditingOption,
    isEditingMatrix,
    editingQuestionId,
    editingOptionQuantity,
  } = useAppSelector((state) => state.question);

  const contentConfig: { [key: string]: ContentType } = {
    option: {
      minQuantity: questionConfig.MIN_OPTIONS_LENGTH,
      typeName: questionConfig.OPTION_NAME,
      uniqueCondition: isEditingOption,
    },
    matrix: {
      minQuantity: questionConfig.MIN_MATRIXS_LENGTH,
      typeName: questionConfig.MATRIX_NAME,
      uniqueCondition: isEditingMatrix,
    },
  };

  const responsedContentConfig = contentConfig[contentType];

  const deleteArrayItemHandler = (
    questionInfo: { id: string; index: number; willEditArray: string[] },
    actionType: string
  ) => {
    try {
      const { id, index, willEditArray } = questionInfo;
      const { minQuantity, typeName, uniqueCondition } = responsedContentConfig;

      const willLowerThanMinQuantity = willEditArray.length < +minQuantity + 1;
      if (willLowerThanMinQuantity)
        throw new Error(
          `【 刪除失敗 】\n${typeName}數量不可以低於${minQuantity}個`
        );

      const isEditingOptionsOfEditingQuestion =
        uniqueCondition && editingQuestionId === id;
      const hasEditingOptions = editingOptionQuantity > 0;

      if (isEditingOptionsOfEditingQuestion || hasEditingOptions)
        throw new Error(`【 刪除失敗 】\n請先完成所有正在編輯的${typeName}`);

      const updateArray = willEditArray.filter((_, i) => i !== index);
      dispatch(
        questionActions.updateSiglePropOfQuestion({
          id,
          actionType,
          stringArr: updateArray,
        })
      );
    } catch (error: any) {
      sweetAlert.errorReminderAlert(error.message);
    }
  };

  return deleteArrayItemHandler;
};

export default useDeleteQuestionContentItem;
