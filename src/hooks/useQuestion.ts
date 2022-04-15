import { useAppSelector } from "./useAppSelector";

const useGetQuestion = (id: string) => {
  const question = useAppSelector((state) =>
    state.question.questions.find((question) => question.id === id)
  );
  return question;
};

export default useGetQuestion;
