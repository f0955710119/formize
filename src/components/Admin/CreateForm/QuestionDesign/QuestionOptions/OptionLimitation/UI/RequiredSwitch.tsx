import { FC } from "react";
import { useAppSelector } from "../../../../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../../../../hooks/useAppDispatch";
import { Switch } from "@mui/material";
import Field from "./Field";
import Label from "./Label";
import { questionActions } from "../../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../../store/actionType/questionActionType";

const RequiredSwitch: FC = () => {
  const dispatch = useAppDispatch();
  const { editingQuestion } = useAppSelector((state) => state.question);
  return (
    <Field>
      <Label>必填</Label>
      <Switch
        onChange={(event) => {
          if (!editingQuestion) return;
          dispatch(
            questionActions.updateSiglePropOfQuestion({
              id: editingQuestion.id,
              actionType: questionActionType.VALIDATIONS,
              validations: {
                ...editingQuestion.validations,
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
