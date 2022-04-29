import { FC, useState, useEffect, useRef, ChangeEvent } from "react";

import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import { userActions } from "../../../store/slice/userSlice";

interface MultipleChoiceProps {
  options: string[];
  maxSelected: number;
  questionId: string;
}

const MultipleChoice: FC<MultipleChoiceProps> = ({
  options,
  maxSelected,
  questionId,
}) => {
  const dispatch = useAppDispatch();
  const questionIdIndex = useGetQuestionIdIndex(questionId);
  const [isValid, setIsValid] = useState(() => {
    const existedOption: {
      [key: string]: boolean;
    } = {};

    options.forEach((option) => {
      existedOption[option] = false;
    });
    return existedOption;
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(options.length).fill("")
  );

  const isDidMount = useRef<boolean>(true);
  const optionValue = Object.values(isValid);
  const error = optionValue.filter((value) => value).length > maxSelected;

  const checkSelectedOptionNumberHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIsValid((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.checked,
      };
    });

    const input = `${+event.target.id + 1}.${event.target.name}\n`;
    const updateInput = selectedOptions.includes(input) ? "" : `${input}`;

    setSelectedOptions((prevState) => {
      const updateState = [...prevState];
      updateState[+event.target.id] = updateInput;
      return updateState;
    });
  };

  useEffect(() => {
    if (isDidMount.current) {
      isDidMount.current = false;
      return;
    }

    if (error) return;
    dispatch(
      userActions.updateFormAnswer({
        questionIdIndex,
        input: selectedOptions.join(""),
      })
    );
  }, [selectedOptions]);

  return (
    <FormControl
      required
      error={error}
      component="fieldset"
      sx={{ m: 3 }}
      variant="standard"
    >
      <FormGroup>
        {options.map((option, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                checked={optionValue[i]}
                onChange={checkSelectedOptionNumberHandler}
                name={option}
                id={`${i}`}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
      {error && (
        <FormHelperText>最多只能選擇{maxSelected}個選項!</FormHelperText>
      )}
    </FormControl>
  );
};

export default MultipleChoice;
