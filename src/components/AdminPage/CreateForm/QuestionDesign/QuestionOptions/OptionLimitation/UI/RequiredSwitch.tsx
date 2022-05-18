import { FC } from "react";

import { Switch } from "@mui/material";


import useAppDispatch from "../../../../../../../hooks/useAppDispatch";
import useGetQuestion from "../../../../../../../hooks/useQuestion";
import questionActionType from "../../../../../../../store/actionType/questionActionType";
import { questionActions } from "../../../../../../../store/slice/questionSlice";
import { Question } from "../../../../../../../types/question";
import Field from "./Field";
import Label from "./Label";

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
      {question && (
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
      )}
    </Field>
  );
};

export default RequiredSwitch;
