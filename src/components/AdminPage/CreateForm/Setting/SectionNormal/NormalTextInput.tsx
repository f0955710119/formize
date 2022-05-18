import { FC, ChangeEvent } from "react";

import Input from "../../UI/Input";

interface NormalTextInputProps {
  value: string | number | null;
  type: string;
  placeholder: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  style?: object;
}

const NormalTextInput: FC<NormalTextInputProps> = ({
  value,
  type,
  placeholder,
  changeHandler,
  style,
}: NormalTextInputProps) => {
  return style ? (
    <Input
      defaultValue={value ? value : ""}
      style={{ ...style }}
      type={type}
      placeholder={placeholder}
      onChange={(event) => {
        changeHandler(event);
      }}
    />
  ) : (
    <Input
      defaultValue={value ? value : ""}
      type={type}
      placeholder={placeholder}
      onChange={(event) => {
        changeHandler(event);
      }}
    />
  );
};

export default NormalTextInput;
