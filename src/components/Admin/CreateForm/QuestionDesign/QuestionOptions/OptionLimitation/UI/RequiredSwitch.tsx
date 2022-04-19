import { FC } from "react";
import { useAppSelector } from "../../../../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../../../../hooks/useAppDispatch";
import { Switch } from "@mui/material";
import Field from "./Field";
import Label from "./Label";
import { questionActions } from "../../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../../store/actionType/questionActionType";
import { Question } from "../../../../../../../types/question";
import useGetQuestion from "../../../../../../../hooks/useQuestion";

interface RequiredSwitchProps {
  id: string;
}

const RequiredSwitch: FC<RequiredSwitchProps> = ({
  id,
}: RequiredSwitchProps) => {
  const dispatch = useAppDispatch();
  const question = useGetQuestion(id) as Question;

  return (
    <Field>
      <Label>必填</Label>
      <Switch
        checked={question.validations.required}
        onChange={(event) => {
          if (!question) return;
          dispatch(
            questionActions.updateSiglePropOfQuestion({
              id: question.id,
              actionType: questionActionType.VALIDATIONS,
              validations: {
                ...question.validations,
                required: event.target.checked,
              },
            })
          );
        }}
      />
    </Field>
  );
};

export default RequiredSwitch;
