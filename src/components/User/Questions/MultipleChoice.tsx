import { FC, useState, ChangeEvent } from "react";
import {
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

interface MultipleChoiceProps {
  options: string[];
  maxSelected: number;
}

const MultipleChoice: FC<MultipleChoiceProps> = ({ options, maxSelected }) => {
  const [isValid, setIsValid] = useState(() => {
    const existedOption: {
      [key: string]: boolean;
    } = {};

    options.forEach((option) => {
      existedOption[option] = false;
    });
    return existedOption;
  });

  const checkSelectedOptionNumberHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIsValid((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.checked,
      };
    });
  };
  const optionValue = Object.values(isValid);
  const error = optionValue.filter((value) => value).length > maxSelected;
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
