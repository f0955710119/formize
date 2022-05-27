import { FC, ChangeEvent } from "react";

import Input from "../../UI/Input";

interface NormalTextInputProps {
  value: string | number | null;
  placeholder: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NormalTextInput: FC<NormalTextInputProps> = ({
  value,
  placeholder,
  changeHandler,
}: NormalTextInputProps) => {
  return (
    <Input
      defaultValue={value ? value : ""}
      type="text"
      placeholder={placeholder}
      onChange={(event) => {
        changeHandler(event);
      }}
    />
  );
};

export default NormalTextInput;
