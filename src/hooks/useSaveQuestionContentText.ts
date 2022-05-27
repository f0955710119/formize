import helper from "../utils/helper";
import sweetAlert from "../utils/sweetAlert";

type SaveMatrixTitleHandler = (
  editingContentInfo: {
    stringArr: string[];
    index: number;
    editingText: string;
  },
  contentName: string,
  updateStringArrCallback: (updateMatrixTitle: string[]) => void
) => void;

const useSaveQuestionContentText = () => {
  const saveMatrixTitleHandler: SaveMatrixTitleHandler = (
    editingContentInfo,
    contentName,
    updateStringArrCallback
  ) => {
    const { stringArr, index, editingText } = editingContentInfo;
    if (editingText.trim().length === 0) {
      sweetAlert.errorReminderAlert(`【儲存失敗】\n${contentName}不能留空`);
      return;
    }

    const newMatrixObj = {
      stringArr,
      index,
      editingText: editingText,
    };

    const checkExistedmatrixTitle = helper.checkExistedName(newMatrixObj);
    if (checkExistedmatrixTitle) {
      sweetAlert.errorReminderAlert(`【儲存失敗】\n不能存取重複的${contentName}名稱`);
      return;
    }
    const updateMatrixTitle = helper.generateUpdateNames(newMatrixObj);
    updateStringArrCallback(updateMatrixTitle);
  };

  return saveMatrixTitleHandler;
};

export default useSaveQuestionContentText;
