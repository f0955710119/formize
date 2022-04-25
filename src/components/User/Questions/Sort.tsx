import { FC, useState } from "react";
import styled from "styled-components";

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
}

const Sort: FC<SortProps> = ({ options, maxSelected }) => {
  const [selectedOptionArr, setSelectedOptionArr] = useState<string[]>([]);
  console.log(selectedOptionArr);
  return (
    <ChoiceWrapper>
      {options.map((option, i) => (
        <OptionItemWrapper
          key={i}
          onClick={() => {
            if (
              selectedOptionArr.find(
                (existedOption) => existedOption === option
              )
            ) {
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
