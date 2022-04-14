import { FC, useState } from "react";
import styled from "styled-components";

const OptionList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #333;
`;

const SelectedOptionList = styled(OptionList)`
  height: 5rem;
  background-color: #fff;
  opacity: 0.7;
`;

interface OptionItemProps {
  number: number;
  isSelected: boolean;
}

const OptionItem = styled.div<OptionItemProps>`
  height: 3rem;
  width: ${(props: OptionItemProps) => `calc(100% / ${props.number} - 2%)`};
  /* height: 100%; */
  background-color: ${(props: OptionItemProps) =>
    props.isSelected ? "#f90" : "#aaa"};
  cursor: pointer;
  border-radius: 30px;
  &:not(:last-child) {
    margin-right: 1.5%;
  }
`;

const WeightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SeletcdWeightIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 2px solid #d17d00;
`;

const SeletcdWeightIconText = styled.span`
  font-size: 1.4rem;
`;

interface SequenceWeightProps {
  id: string;
  options: string[];
}

const SequenceWeight: FC<SequenceWeightProps> = ({
  id,
  options,
}: SequenceWeightProps) => {
  const [unselectedOptions, setUnselectedOptions] = useState<string[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([""]);
  // BUG: 僅提供畫面操作，不會真的 dispatch 去題目 > 這邊要做的是按下文字可以編輯選項 / 新增選項
  console.log(unselectedOptions);
  console.log(selectedOptions);
  return (
    <>
      <OptionList>
        {unselectedOptions.map((item, i) => (
          <OptionItem
            key={item}
            number={options.length}
            isSelected={false}
            onClick={() => {
              setUnselectedOptions((prevState) => {
                const newSelectedOptions = prevState.filter(
                  (option) => option !== item
                );
                return newSelectedOptions;
              });
              setSelectedOptions((prevState) => {
                if (prevState[0] === "") return [item];
                const newSelectedOptions = [...prevState, item];
                return newSelectedOptions;
              });
            }}
          >
            {item}
          </OptionItem>
        ))}
      </OptionList>
      <SelectedOptionList>
        {selectedOptions[0] !== "" &&
          selectedOptions.map((item, i) => (
            <OptionItem
              key={item}
              number={options.length}
              isSelected
              onClick={() => {
                setUnselectedOptions((prevState) => {
                  if (prevState[0] === "") return [item];
                  const newSelectedOptions = [...prevState, item];
                  return newSelectedOptions;
                });
                setSelectedOptions((prevState) => {
                  const newSelectedOptions = prevState.filter(
                    (option) => option !== item
                  );
                  return newSelectedOptions;
                });
              }}
            >
              <WeightWrapper>
                <SeletcdWeightIconWrapper>
                  <SeletcdWeightIconText>{i + 1}</SeletcdWeightIconText>
                </SeletcdWeightIconWrapper>
                {item}
              </WeightWrapper>
            </OptionItem>
          ))}
      </SelectedOptionList>
    </>
  );
};

export default SequenceWeight;
