import { FC, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import { userActions } from "../../../store/slice/userSlice";

export const ChoiceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;

const OptionItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0.4rem;
  width: 30%;
  height: 6rem;
  border: 2px solid ${(props) => props.theme.optionText};
`;

const OptionItemText = styled.div`
  width: 70%;
  font-size: 1.8rem;
  color: ${(props) => props.theme.optionText};
`;

interface SortProps {
  options: string[];
  maxSelected: number;
  questionId: string;
}

const Sort: FC<SortProps> = ({ options, maxSelected, questionId }) => {
  const dispatch = useAppDispatch();
  const [selectedOptionArr, setSelectedOptionArr] = useState<string[]>([]);
  const questionIndexForFirstOption = useGetQuestionIdIndex(
    `${questionId}_${0}`
  );
  const questionIdIndexList = Array(options.length)
    .fill(null)
    .map((_, i) => questionIndexForFirstOption + i);

  const didMount = useRef<boolean>(true);

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
      return;
    }

    questionIdIndexList.forEach((questionIdIndex, i) => {
      const input = `${selectedOptionArr.indexOf(options[i]) + 1}`;
      dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));
    });
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
          <OptionItemText>
            {selectedOptionArr.find((oldOption) => oldOption === option)
              ? `${selectedOptionArr.indexOf(option) + 1} ${option}`
              : option}
          </OptionItemText>
        </OptionItemWrapper>
      ))}
    </ChoiceWrapper>
  );
};

export default Sort;
