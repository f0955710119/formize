import { FC } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

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
    <Autocomplete
      disablePortal
      id={id}
      options={options}
      sx={{
        width: style.width,
        borderRadius: style.radius,
        mr: style.mr,
      }}
      renderInput={(params) => <TextField {...params} label={fieldLabel} />}
    />
  );
};

export default FilterComboBox;
