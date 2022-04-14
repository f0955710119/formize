import { FC, useState } from "react";
import styled from "styled-components";

const defaultOptionsList = ["Frontend", "Backend", "iOS", "Android"];

const OptionList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  /* height: 3rem; */
  border: 1px solid #333;
`;

const SelectedOptionList = styled(OptionList)`
  height: 5rem;
  background-color: #fff;
  opacity: 0.7;
`;

interface OptionItemProps {
  number: number;
}

const OptionItem = styled.div<OptionItemProps>`
  width: ${(props: OptionItemProps) => `calc(100% / ${props.number} - 2%)`};
  /* height: 100%; */
  background-color: #f90;
  cursor: pointer;
`;

interface SequenceWeightProps {
  options: string[];
}

const SequenceWeight: FC<SequenceWeightProps> = ({
  options,
}: SequenceWeightProps) => {
  const [unselectedOptions, setUnselectedOptions] = useState<string[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([""]);
  // BUG: 僅提供畫面操作，不會真的 dispatch 去題目 > 這邊要做的是按下文字可以編輯選項 / 新增選項
  return (
    <>
      <OptionList>
        {unselectedOptions.map((item, i) => (
          <OptionItem
            key={item}
            number={options.length}
            onClick={() => {
              setUnselectedOptions((prevState) => {
                const newSelectedOptions = prevState.filter(
                  (option) => option !== item
                );
                return newSelectedOptions;
              });
              setSelectedOptions((prevState) => {
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
        {selectedOptions.map((item, i) => (
          <OptionItem key={item} number={selectedOptions.length}>
            {item}
          </OptionItem>
        ))}
      </SelectedOptionList>
    </>
  );
};

export default SequenceWeight;
