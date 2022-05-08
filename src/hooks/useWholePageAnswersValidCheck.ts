import { userActions } from "../store/slice/userSlice";
import { Question } from "../types/question";
import { UserAnswer } from "../types/userForm";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import useCheckAnswerValid from "./useCheckAnswerValid";

const useWholePageAnswersValidCheck = () => {
  const { errorMessages, errorMessagesIdKeys } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  // prettier-ignore
  const useWholePageValidHandler = ( questions: Question[], answers: UserAnswer[] ) => {
    const responsedAnswerIndex: number[] = [];
    const invalidAnswerWithItsResponseQuestionId: string[] = [];
    const invalidAnswerWithItsResponseQuestionIndex: number[] = [];

    let hasInvalidInput = false;
    
    questions
      .filter((question) => question.validations.required)
      .forEach((question, i) => {
        answers.forEach((answer, i) => {
          if (!answer.questionId.includes(question.id)) return;
          responsedAnswerIndex.push(i);
        });
      });

    responsedAnswerIndex.forEach(index=>{
        if (!answers[index]) return
        if (answers[index].input !== null) return;
        if (invalidAnswerWithItsResponseQuestionId.includes(answers[index].questionId.split('_')[0])) return
        invalidAnswerWithItsResponseQuestionId.push(answers[index].questionId.split('_')[0]) 
    })

    if(invalidAnswerWithItsResponseQuestionId.length === 0) {
        for(let i = 0; i < errorMessages.length; i++){
            if (errorMessages[i] === '') return
            hasInvalidInput = true
            break
        }
        return hasInvalidInput
    };

    hasInvalidInput= true
    invalidAnswerWithItsResponseQuestionId.forEach(id=>{
        invalidAnswerWithItsResponseQuestionIndex.push(errorMessagesIdKeys[id])
    })


    invalidAnswerWithItsResponseQuestionIndex.forEach(index=>{
        if (errorMessages[index] !== '') return;
        dispatch(userActions.setErrorMessageOfInvalidAnswer({questionIdIndex:index,errorMessage:'此題必填，需填答才可做最後的問卷送出喲!'}))
    })

    return hasInvalidInput

  };

  return useWholePageValidHandler;
};

export default useWholePageAnswersValidCheck;
