import { FC } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CustomedComboBox = styled(Autocomplete)`
  & div {
    border-radius: 3px;
  }

  & label {
    font-size: 1.4rem;
  }
`;
interface FilterComboBoxProps {
  fieldLabel: string;
  options: string[];
  id: string;
  style: {
    width: string;
    radius: string | number;
    mr: string | number;
  };
}

const FilterComboBox: FC<FilterComboBoxProps> = ({
  fieldLabel,
  options,
  id,
  style,
}: FilterComboBoxProps) => {
  return (
    <CustomedComboBox
      disablePortal
      id={id}
      options={options}
      sx={{
        width: style.width,
        borderRadius: `${style.radius}px`,
        mr: style.mr,
      }}
      renderInput={(params) => <TextField {...params} label={fieldLabel} />}
    />
  );
};

export default FilterComboBox;
