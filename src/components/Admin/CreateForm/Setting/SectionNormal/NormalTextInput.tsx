import { FC, ChangeEvent } from "react";
import Input from "../../UI/Input";

interface NormalTextInputProps {
  type: string;
  placeholder: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  style?: object;
}

const NormalTextInput: FC<NormalTextInputProps> = ({
  type,
  placeholder,
  changeHandler,
  style,
}: NormalTextInputProps) => {
  return style ? (
    <Input
      style={{ ...style }}
      type={type}
      placeholder={placeholder}
      onChange={(event) => {
        changeHandler(event);
      }}
    />
  ) : (
    <Input
      type={type}
      placeholder={placeholder}
      onChange={(event) => {
        changeHandler(event);
      }}
    />
  );
};

export default NormalTextInput;
