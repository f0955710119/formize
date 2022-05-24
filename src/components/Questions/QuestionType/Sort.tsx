import { FC, useState, useRef, useEffect } from "react";

import styled from "styled-components";
import breakpointConfig from "../../../configs/breakpointConfig";

import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import useCheckAnswerValid from "../../../hooks/useCheckAnswerValid";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import { userActions } from "../../../store/slice/userSlice";

export const ChoiceWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
`;

const OptionItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0.4rem 1rem;
  width: 60%;
  height: 6rem;
  border: 2px solid ${(props) => props.theme.optionText};
  border-radius: 5px;

  @media ${breakpointConfig.tablet} {
    width: 100%;
  }
`;

const OptionItemText = styled.div`
  font-size: 1.8rem;
  color: ${(props) => props.theme.optionText};
  width: calc(100% - 2.4rem);
`;

interface OptionSortedIndexProps {
  isLoading: boolean;
}

const OptionSortedIndex = styled(OptionItemText)<OptionSortedIndexProps>`
  margin-right: 1rem;
  width: 2.4rem;
  height: 2.4rem;
  text-align: center;
  line-height: 2.4rem;
  font-size: 1.5rem;
  background-color: ${(props) => props.theme.optionText};
  color: #fff;
  border-radius: 50%;
`;

interface SortProps {
  options: string[];
  maxSelected: number;
  questionId: string;
}

const Sort: FC<SortProps> = ({ options, maxSelected, questionId }) => {
  const dispatch = useAppDispatch();
  const { answers } = useAppSelector((state) => state.user);
  const showInvalidHandler = useCheckAnswerValid(questionId);
  const [selectedOptionArr, setSelectedOptionArr] = useState<string[]>(() => {
    const sortedArray: string[] = [];
    options.forEach((option, i) => {
      const responsedIdAnswer = answers.find(
        (answer) => answer.questionId === `${questionId}_${i}`
      );
      if (!responsedIdAnswer) return;
      if (responsedIdAnswer?.input === null || responsedIdAnswer?.input === "0") return;
      sortedArray[+responsedIdAnswer.input - 1] = option;
    });
    return sortedArray;
  });
  const questionIndexForFirstOption = useGetQuestionIdIndex(`${questionId}_${0}`);

  const questionIdIndexList = Array(options.length)
    .fill(null)
    .map((_, i) => questionIndexForFirstOption + i);

  const didMount = useRef<boolean>(true);
  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
      return;
    }

    const hasNotMatchSelected = selectedOptionArr.length !== maxSelected;

    questionIdIndexList.forEach((questionIdIndex, i) => {
      const input = `${selectedOptionArr.indexOf(options[i]) + 1}`;
      dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));
    });

    if (hasNotMatchSelected) {
      showInvalidHandler(`必須排序${maxSelected}個選項，不能多也不能少`);
      return;
    }

    showInvalidHandler("");
  }, [selectedOptionArr]);

  return (
    <ChoiceWrapper>
      {options.map((option, i) => (
        <OptionItemWrapper
          key={i}
          onClick={() => {
            const hasExistedOption = selectedOptionArr.find(
              (existedOption) => existedOption === option
            );

            if (hasExistedOption) {
              const updateSelectedOptionArr = selectedOptionArr.filter(
                (existedOption) => existedOption !== option
              );
              setSelectedOptionArr(updateSelectedOptionArr);
              return;
            }
            if (selectedOptionArr.length > maxSelected) return;

            setSelectedOptionArr((prevState) => {
              const oldSelectedOptioArr = [...prevState, option];
              return oldSelectedOptioArr;
            });
          }}
        >
          {selectedOptionArr.find((oldOption) => oldOption === option) && (
            <OptionSortedIndex isLoading={didMount.current}>
              {`${selectedOptionArr.indexOf(option) + 1}`}
            </OptionSortedIndex>
          )}

          <OptionItemText>{option}</OptionItemText>
        </OptionItemWrapper>
      ))}
    </ChoiceWrapper>
  );
};

export default Sort;
